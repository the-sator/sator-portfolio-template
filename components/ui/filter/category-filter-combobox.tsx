"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, WandSparkles, Check } from "lucide-react";
import { IoClose } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Tag from "../tag";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-red-500 hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    color?: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange?: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;

  filterKey: string;

  size?: "sm" | "md" | "lg";

  onTagUpdate?: () => Promise<void>;
}

const sizeClasses = {
  sm: "min-w-[150px]",
  md: "min-w-[300px]",
  lg: "min-w-[400px]",
};

export const CategoryFilterCombobox = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      className,
      size = "md",
      filterKey,
      ...props
    },
    ref,
  ) => {
    const defaultValueArray = Array.isArray(defaultValue)
      ? defaultValue
      : [defaultValue];
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValueArray);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const selectedArray = Array.isArray(selectedValues)
      ? selectedValues
      : [selectedValues];

    React.useEffect(() => {
      if (JSON.stringify(selectedValues) !== JSON.stringify(defaultValue)) {
        setSelectedValues(selectedValues);
      }
    }, [defaultValue, selectedValues]);
    const debouncedNavigate = useDebouncedCallback((filters: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete(filterKey);

      filters.forEach((filter) => params.append(filterKey, filter));

      const newUrl = `${pathname}?${params.toString()}`;
      React.startTransition(() => {
        router.push(newUrl);
      });
    }, 500);

    const navigateToFilters = React.useCallback(
      (filters: string[]) => {
        debouncedNavigate(filters);
      },
      [debouncedNavigate],
    );

    const handleInputKeyDown = async (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
      }
    };

    const toggleOption = (value: string) => {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      navigateToFilters(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      navigateToFilters([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
    };

    const handleInputChange = (search: string) => {
      setInputValue(search);
    };
    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            variant="outline"
            role="combobox"
            className={cn(
              `${sizeClasses[size]} h-full justify-between`,
              className,
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedArray.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Tag
                        key={value}
                        color={option?.color}
                        // style={{ animationDuration: `${animation}s` }}
                      >
                        {IconComponent && (
                          <IconComponent className="mr-2 h-4 w-4" />
                        )}
                        {option?.label}
                        <IoClose
                          className="ml-2 h-4 w-4 cursor-pointer hover:text-blue-600"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Tag>
                    );
                  })}
                  {selectedArray.length > maxCount && (
                    <Badge
                      className={cn(
                        "border-foreground/1 bg-popover text-foreground hover:bg-transparent",
                        isAnimating ? "animate-bounce" : "",
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {`+ ${selectedValues.length - maxCount} more`}
                      <IoClose
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </div>
            ) : (
              <div className="flex w-full items-center justify-between px-1">
                <span className="text-sm font-normal">{placeholder}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command
            filter={(value, search) => {
              const hasMatch = value
                .toLowerCase()
                .includes(search.toLowerCase());
              return hasMatch ? 1 : 0;
            }}
          >
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
              onValueChange={handleInputChange}
              value={inputValue}
              ref={inputRef}
            />
            <CommandList>
              <CommandEmpty />
              <CommandGroup>
                {options.length > 0 ? (
                  <>
                    {options.map((option) => {
                      const isSelected = selectedValues.includes(option.value);
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => toggleOption(option.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {/* <p>{option.label}</p> */}
                          <div className="flex w-full items-center justify-between">
                            <Tag color={option.color}>{option?.label}</Tag>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </>
                ) : (
                  <CommandItem disabled>No options available</CommandItem>
                )}
              </CommandGroup>
              <CommandGroup>
                <div className="flex flex-col items-center justify-center">
                  {selectedValues.length > 0 && (
                    <>
                      <Separator
                        // orientation=""
                        className="block w-full"
                      />
                      <CommandItem
                        onSelect={handleClear}
                        className="mt-1 flex w-full justify-center"
                      >
                        Clear
                      </CommandItem>
                    </>
                  )}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              "my-2 h-3 w-3 cursor-pointer bg-background text-foreground",
              isAnimating ? "" : "text-muted-foreground",
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  },
);

CategoryFilterCombobox.displayName = "CategoryFilterCombobox";
