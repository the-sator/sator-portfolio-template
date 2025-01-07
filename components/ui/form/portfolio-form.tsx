"use client";
import React, { FormEvent, useRef, useState, useTransition } from "react";
import { InputWithLabel, TextAreaWithLabel } from "@/components/ui/input-label";
import { Label } from "@/components/ui/label";
import { CategoryMultiSelect } from "@/components/ui/select/category-multiselect";
import { Button } from "../button";
import MultiUploadButton from "../button/multi-upload-button";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { slugify } from "@/utils/string";
import { nanoid } from "nanoid";
import {
  createPortfolioAction,
  updatePortfolioAction,
} from "@/action/portfolio.action";
import { ZodFormattedError } from "zod";
import { CreatePortfolio, Portfolio } from "@/types/portfolio.type";
import { toast } from "@/hooks/use-toast";
import { Category } from "@/types/category.type";
import Spinner from "../spinner";
import { ImagePreview } from "@/types/base.type";
import { UploadState } from "@/enum/base.enum";
import { SiteUser } from "@/types/site-user.type";
import CoverImageUpload from "../cover-image-upload";
import { uploadImage } from "@/data/upload";
import { DynamicEditor, EditorRef } from "@/components/editor/editor";

type Props = {
  user: SiteUser;
  categories: Category[];
  portfolio?: Portfolio;
};
export default function PortfolioForm({ user, categories, portfolio }: Props) {
  //Load Value
  const galleryPreview =
    portfolio && portfolio.gallery
      ? portfolio.gallery.map((image) => {
          return {
            id: crypto.randomUUID(),
            status: UploadState.UPLOADED,
            url: image,
          };
        })
      : [];
  const categoryIds =
    portfolio && portfolio.CategoryOnPorfolio
      ? portfolio.CategoryOnPorfolio.map((category) => {
          return category.category_id;
        })
      : [];

  //Image
  const [images, setImages] = useState<File[] | null>([]);
  const [imagePreviews, setImagePreviews] =
    useState<ImagePreview[]>(galleryPreview);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    portfolio && portfolio.cover_url ? portfolio.cover_url : null,
  );

  //State
  const [errors, setErrors] =
    useState<ZodFormattedError<CreatePortfolio> | null>(null);
  const [slug, setSlug] = useState(portfolio && portfolio.slug);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(categoryIds);
  const [isUploadPending, startUploadTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  //Constant
  const categoryOption = categories?.map((category) => {
    return {
      label: category.name,
      color: category.color.toLowerCase(),
      value: category.id,
    };
  });

  //Ref
  const editorRef = useRef<EditorRef>(null);
  const idRef = React.useRef(nanoid(10)); // ID persists across renders

  //Function
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value && `${slugify(e.target.value)}-${idRef.current}`);
  };

  const handleCreatePortfolio = async (formData: FormData) => {
    const data = {
      title: formData.get("title"),
      content: JSON.stringify(editorRef.current?.editor?.document),
      description: formData.get("description"),
      site_user_id: user.id,
      slug: slug,
      categories: selectedCategories,
      cover_url: coverPreviewUrl || null,
      gallery: imagePreviews.map((image) => {
        return image.url;
      }),
    };
    const response = portfolio
      ? await updatePortfolioAction(portfolio.id, data)
      : await createPortfolioAction(data);
    if (response?.error) {
      //IF is http error then show toast
      if ("statusCode" in response.error) {
        toast({
          title: "Portfolio Save Error",
          description: response.error.error,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        //ELSE set Zod error to input
        setErrors(response.error);
      }
    } else {
      toast({
        title: "Portfolio Saved!",
        variant: "success",
        duration: 1500,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form reset behavior
    const formData = new FormData(e.currentTarget);
    startSubmitTransition(async () => {
      await handleCreatePortfolio(formData);
    });
  };

  React.useEffect(() => {
    if (!coverImage) return;
    const handleUploadCover = async (image: File) => {
      try {
        startUploadTransition(async () => {
          const { url } = await uploadImage(image);
          setCoverPreviewUrl(url);
        });
      } catch (error) {
        toast({
          title: "Unexpected Error!",
          description: error instanceof Error ? error.message : String(error),
          variant: "destructive",
        });
      }
    };
    handleUploadCover(coverImage);
  }, [coverImage]);

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 pb-20">
      <div className="flex flex-col gap-4">
        <Label>
          Cover Image <span className="text-red-500">*</span>
        </Label>
        <CoverImageUpload
          coverPreviewUrl={coverPreviewUrl}
          setCoverImage={setCoverImage}
          isUploadPending={isUploadPending}
          setCoverPreviewUrl={setCoverPreviewUrl}
          errors={errors?.cover_url}
        />
      </div>
      <div>
        <InputWithLabel
          label="Title"
          required
          name="title"
          placeholder="My First Portfolio"
          onChange={handleSlugChange}
          defaultValue={portfolio && portfolio.title}
          errors={errors?.title}
        />
        <span className="mt-1 text-xs text-label">Slug: {slug}</span>
      </div>
      <TextAreaWithLabel
        label="Description"
        name="description"
        maxLength={200}
        showCount
        required
        placeholder="This is my awesome portfolio and it is all about..."
        onChange={handleSlugChange}
        defaultValue={portfolio && portfolio.description}
        errors={errors?.description}
      />
      <div className="flex flex-col gap-4">
        <Label>Category</Label>
        <CategoryMultiSelect
          options={categoryOption}
          placeholder="Click to select tags"
          maxCount={3}
          onValueChange={(value) => {
            setSelectedCategories(value);
          }}
          user={user}
          defaultValue={selectedCategories}

          // onTagUpdate={handleGetTags}
        />
        <div className="flex flex-col gap-4">
          <Label>Content</Label>
          <DynamicEditor ref={editorRef} content={portfolio?.content} />
        </div>
        <div className="flex flex-col gap-4">
          <Label>Gallery</Label>
          <MultiUploadButton
            images={images}
            setImages={setImages}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
          >
            <Button
              variant={"icon"}
              className="relative h-16 w-16 rounded-sm border border-dashed hover:border-label/50 hover:bg-transparent"
            >
              <FaPlus />
            </Button>
          </MultiUploadButton>
        </div>
      </div>
      <Button
        disabled={isSubmitPending}
        className="fixed bottom-6 right-6 h-10 w-10 rounded-full p-0 hover:opacity-30"
      >
        {isSubmitPending ? (
          <Spinner className="text-foreground dark:text-background" />
        ) : (
          <FaCheck />
        )}
      </Button>
    </form>
  );
}
