import React, { useRef, useState } from "react";
import profilePic from "../../assets/profile-pic.jpg";
import {
  useBrandProfile,
  useUpdateBrandProfile,
  useUploadBrandPhoto,
} from "../../hooks/useBrand";

export default function BrandProfileHeader() {
  const [editing, setEditing] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: brandProfile } = useBrandProfile();
  const updateProfile = useUpdateBrandProfile();
  const uploadPhoto = useUploadBrandPhoto();

  const startEditing = () => {
    setNameValue(brandProfile?.company_name || "");
    setDescValue(brandProfile?.description || "");
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const saveEditing = () => {
    const trimmedName = nameValue.trim();
    const trimmedDesc = descValue.trim();
    const updates: Record<string, string | null> = {};
    if (trimmedName && trimmedName !== brandProfile?.company_name) {
      updates.company_name = trimmedName;
    }
    if (trimmedDesc !== (brandProfile?.description || "")) {
      updates.description = trimmedDesc || null;
    }
    if (Object.keys(updates).length > 0) {
      updateProfile.mutate(updates, {
        onSuccess: () => setEditing(false),
      });
    } else {
      setEditing(false);
    }
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    uploadPhoto.mutate(file);
    event.target.value = "";
  };

  return (
    <div className="mb-9 border-b border-black/8 pb-9">
      <div className="flex items-center gap-6 max-md:gap-3.5">
        <button
          type="button"
          className="shrink-0 cursor-pointer border-none bg-transparent p-0"
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            className="h-25 w-25 rounded-3xl border-2 border-coquette-rose/35 object-cover transition-colors duration-200 hover:border-coquette-rose max-md:h-16 max-md:w-16 max-md:rounded-2xl"
            src={brandProfile?.profile_image_url || profilePic}
            alt={brandProfile?.company_name || "Brand Avatar"}
          />
        </button>
        <div className="flex-1 flex align-top">
          {editing ? (
            <div className="flex-1">
              <input
                className="-ml-2 box-border w-full rounded-sm border-[1.5px] border-coquette-rose bg-white px-2 py-1 font-body text-base leading-relaxed text-black outline-none"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                placeholder="Brand name"
                autoFocus
              />
              <input
                className="-ml-2 mt-2 box-border w-full rounded-sm border-[1.5px] border-coquette-rose bg-white px-2 py-1 font-body text-base leading-relaxed text-black outline-none"
                value={descValue}
                onChange={(e) => setDescValue(e.target.value)}
                placeholder="Add a description..."
              />
              <div className="mt-3 flex gap-2">
                <button
                  className="cursor-pointer rounded-lg border-none bg-coquette-rose px-5 py-1.5 text-[13px] font-semibold text-white transition-opacity duration-150 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={saveEditing}
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? "Saving..." : "Save"}
                </button>
                <button
                  className="cursor-pointer rounded-lg border-[1.5px] border-[#ccc] bg-transparent px-5 py-1.5 text-[13px] font-semibold text-[#666] transition-colors duration-150 hover:bg-black/4 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={cancelEditing}
                  disabled={updateProfile.isPending}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666]">
                  Brand profile
                </span>
                <h1 className="my-4 text-[32px] font-extrabold tracking-tight text-coquette-soft-black max-md:text-xl">
                  {brandProfile?.company_name || "Brand Name"}
                </h1>
                <p className="m-0 py-1.5 text-base leading-relaxed text-black">
                  {brandProfile?.description || "Add a description..."}
                </p>
              </div>
              <button
                className="ml-auto cursor-pointer self-start rounded-lg border-[1.5px] border-coquette-rose bg-transparent px-4 py-1.5 text-[13px] font-semibold text-coquette-rose transition-colors duration-150 hover:bg-coquette-rose hover:text-white"
                onClick={startEditing}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handlePhotoUpload}
      />
    </div>
  );
}
