import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./Button";
import { supabase } from "../../lib/supabase";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export const ImageUpload = ({
  value,
  onChange,
  label = "Upload Image",
  className = "",
}: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setIsLoading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("media").getPublicUrl(filePath);

      onChange(data.publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Mock upload removed as we now use real upload
  // Kept button for UX but will trigger file select essentially or maybe separate "Test" button?
  // Let's replace "Mock Upload" with nothing or just keep "Select File" as primary.
  // Reviewing previous code: "Mock Upload" button was explicitly there.
  // I will remove the "Mock Upload" button to avoid confusion, or map it to a demo image if requested,
  // but better to encourage real uploads now. I'll just remove the "Mock Upload" button.

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-bold text-neutral-600 block">
        {label}
      </label>

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-neutral-200 aspect-video bg-neutral-50">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="white"
              size="sm"
              onClick={() => onChange("")}
              className="bg-white text-red-500 hover:text-red-700"
            >
              <X size={16} className="mr-2" /> Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-neutral-200 hover:border-primary/50"}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {isLoading ? (
            <div className="flex flex-col items-center animate-pulse">
              <div className="w-12 h-12 bg-neutral-200 rounded-full mb-3"></div>
              <div className="h-4 bg-neutral-200 rounded w-24"></div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload size={32} className="text-neutral-400 mb-3" />
              <p className="text-sm text-neutral-600 font-medium mb-1">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-neutral-400 mb-4">
                Supports JPG, PNG (Max 5MB)
              </p>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Select File
                </Button>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] && handleFile(e.target.files[0])
            }
          />
        </div>
      )}
    </div>
  );
};
