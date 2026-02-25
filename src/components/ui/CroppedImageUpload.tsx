import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Upload, X, Crop as CropIcon } from "lucide-react";
import { Button } from "./Button";
import { supabase } from "../../lib/supabase";

interface CroppedImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  aspect?: number;
  uploadBucket?: string;
  uploadFolder?: string;
}

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.crossOrigin = "anonymous";
    image.src = url;
  });

const getCroppedBlob = async (
  imageSrc: string,
  cropPixels: Area
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not initialize canvas context");
  }

  canvas.width = Math.max(1, Math.floor(cropPixels.width));
  canvas.height = Math.max(1, Math.floor(cropPixels.height));

  ctx.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create cropped image blob"));
        }
      },
      "image/jpeg",
      0.92
    );
  });
};

export const CroppedImageUpload = ({
  value,
  onChange,
  label = "Upload Image",
  className = "",
  aspect = 16 / 9,
  uploadBucket = "media",
  uploadFolder = "division-heroes",
}: CroppedImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [sourceImageUrl, setSourceImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canUploadCrop = useMemo(
    () => Boolean(sourceImageUrl && croppedAreaPixels && !isUploading),
    [sourceImageUrl, croppedAreaPixels, isUploading]
  );

  useEffect(() => {
    return () => {
      if (sourceImageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(sourceImageUrl);
      }
    };
  }, [sourceImageUrl]);

  const openCropper = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setSourceImageUrl(objectUrl);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsCropping(true);
  };

  const handleUploadCroppedImage = async () => {
    if (!sourceImageUrl || !croppedAreaPixels) return;

    setIsUploading(true);
    try {
      const croppedBlob = await getCroppedBlob(sourceImageUrl, croppedAreaPixels);
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}.jpg`;
      const filePath = `${uploadFolder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(uploadBucket)
        .upload(filePath, croppedBlob, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(uploadBucket).getPublicUrl(filePath);
      onChange(data.publicUrl);
      setIsCropping(false);
    } catch (error) {
      console.error("Error uploading cropped image:", error);
      alert("Error uploading cropped image");
    } finally {
      setIsUploading(false);
      if (sourceImageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(sourceImageUrl);
      }
      setSourceImageUrl(null);
    }
  };

  const cancelCropping = () => {
    if (sourceImageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(sourceImageUrl);
    }
    setIsCropping(false);
    setSourceImageUrl(null);
    setCroppedAreaPixels(null);
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      openCropper(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-bold text-neutral-600 block">{label}</label>

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-neutral-200 aspect-video bg-neutral-50">
          <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="white"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <CropIcon size={16} className="mr-2" /> Replace
            </Button>
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
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-neutral-200 hover:border-primary/50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <Upload size={32} className="text-neutral-400 mb-3" />
            <p className="text-sm text-neutral-600 font-medium mb-1">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-neutral-400 mb-4">
              Supports JPG, PNG (crop before save)
            </p>

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
        onChange={(e) => e.target.files?.[0] && openCropper(e.target.files[0])}
      />

      {isCropping && sourceImageUrl && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary">Crop Division Image</h3>
              <button
                type="button"
                className="text-neutral-500 hover:text-neutral-700"
                onClick={cancelCropping}
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative w-full h-[55vh] bg-neutral-900">
              <Cropper
                image={sourceImageUrl}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                objectFit="cover"
              />
            </div>

            <div className="p-4 border-t border-neutral-200 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-600 min-w-10">Zoom</span>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={cancelCropping}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleUploadCroppedImage}
                  disabled={!canUploadCrop}
                >
                  {isUploading ? "Uploading..." : "Crop & Upload"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
