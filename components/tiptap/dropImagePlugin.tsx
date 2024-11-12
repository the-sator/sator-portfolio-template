import { Plugin, PluginKey } from "prosemirror-state";
import { compressImage } from "../../lib/image";
import { toast } from "@/hooks/use-toast";

export type UploadFn = (image: File) => Promise<
  | {
      error: any;
      publicUrl?: undefined;
    }
  | {
      publicUrl: string;
      error: null;
    }
>;

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export const dropImagePlugin = (compressedSize: number, upload?: UploadFn) => {
  return new Plugin({
    props: {
      handlePaste(view, event, slice) {
        const items = Array.from(event.clipboardData?.items || []);
        let imageHandled = false;
        if (!compressedSize) {
          toast({
            title: "Unexpected Error!",
            variant: "destructive",
          });
          return;
        }

        // Check if there's an image in the pasted content
        items.forEach(async (item) => {
          const image = item.getAsFile();
          if (item.type.indexOf("image") === 0 && image) {
            event.preventDefault(); // Only prevent default for image paste

            imageHandled = true;

            // Convert to base64 first
            const dataUrl = await blobToBase64(image);
            const node = view.state.schema.nodes.image.create({
              src: dataUrl,
            });
            const transaction = view.state.tr.replaceSelectionWith(node);
            view.dispatch(transaction);

            // Proceed with image compression and upload
            const compressedImage = await compressImage(image, {
              maxSizeMB: compressedSize,
            });
            if (!upload) return;
            const { publicUrl, error } = await upload(compressedImage);

            if (!error && publicUrl) {
              // Replace data URL with public URL once uploaded
              const pos = view.state.selection.anchor - 1;
              view.dispatch(
                view.state.tr.setNodeMarkup(pos, null, {
                  src: publicUrl,
                }),
              );
            }
          }
        });

        // Allow non-image content (e.g., text) to be pasted as usual
        if (!imageHandled) {
          return false; // Let ProseMirror handle other types of pasted content
        }

        return true; // Indicate that we've handled the image paste
      },
      handleDOMEvents: {
        drop: (view, event) => {
          const hasFiles =
            event.dataTransfer &&
            event.dataTransfer.files &&
            event.dataTransfer.files.length;

          if (!hasFiles) {
            return false;
          }

          const images = Array.from(event.dataTransfer?.files ?? []).filter(
            (file) => /image/i.test(file.type),
          );

          if (images.length === 0) {
            return false;
          }

          event.preventDefault();

          const { schema } = view.state;
          const coordinates = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });
          if (!coordinates) return false;
          if (!compressedSize) {
            toast({
              title: "Unexpected Error!",
              variant: "destructive",
            });
            return;
          }

          images.forEach(async (image) => {
            const reader = new FileReader();

            if (upload && image) {
              const dataUrl = await blobToBase64(image);
              const node = schema.nodes.image.create({
                src: dataUrl,
              });
              const transaction = view.state.tr.insert(coordinates.pos, node);
              view.dispatch(transaction);

              if (upload) {
                const compressedImage = await compressImage(image, {
                  maxSizeMB: compressedSize,
                });
                const { publicUrl, error } = await upload(compressedImage);

                if (!error && publicUrl) {
                  // Once upload is successful, replace the data URL with the final public URL
                  const pos = view.state.selection.anchor - 1; // Assuming the image is at the current selection's anchor
                  view.dispatch(
                    view.state.tr.setNodeMarkup(pos, null, {
                      src: publicUrl,
                    }),
                  );
                }
              }
            } else {
              reader.onload = (readerEvent) => {
                const node = schema.nodes.image.create({
                  src: readerEvent.target?.result,
                });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              };
              reader.readAsDataURL(image);
            }
          });

          return true;
        },
      },
    },
  });
};
