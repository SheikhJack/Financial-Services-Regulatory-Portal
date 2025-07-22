"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { contentSchema, ContentSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createContent, updateContent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const ContentForm = ({
    type,
    data,
    setOpen,
    relatedData
}: {
    type: "create" | "update";
    relatedData?: any;
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContentSchema>({
        resolver: zodResolver(contentSchema),
    });

    const [url, setUrl] = useState<string>(data?.url || "");

    const [state, formAction] = useFormState(
        type === "create" ? createContent : updateContent,
        {
            success: false,
            error: false,
        }
    );

    const onSubmit = handleSubmit((formData) => {
        formAction({ ...formData, url });
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Content ${type === "create" ? "created" : "updated"}!`);
            setOpen(false);
            router.refresh();
        }
    }, [state, router, setOpen, type]);

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create" ? "Create Content" : "Update Content"}
            </h1>
            <div className="flex flex-wrap gap-4">
                <InputField
                    label="Title"
                    name="title"
                    defaultValue={data?.title}
                    register={register}
                    error={errors.title}
                />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Content Type</label>
                    <select
                        {...register("type")}
                        defaultValue={data?.type}
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    >
                        <option value="post">Post</option>
                        <option value="pdf">PDF</option>
                        <option value="image">Image</option>
                    </select>
                    {errors.type?.message && (
                        <p className="text-xs text-red-400">{errors.type.message}</p>
                    )}
                </div>

                {data && (
                    <InputField
                        name="id"
                        label="Id"
                        defaultValue={data?.id}
                        register={register}
                        hidden
                    />
                )}

                <CldUploadWidget
                    uploadPreset="financial"
                    onSuccess={(result, { widget }) => {
                        if (typeof result.info === "object" && result.info !== null && "secure_url" in result.info) {
                            setUrl((result.info as { secure_url: string }).secure_url);
                        }
                        widget.close();
                    }}
                >
                    {({ open }) => (
                        <div
                            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                            onClick={() => open()}
                        >
                            <Image src="/upload.png" alt="" width={28} height={28} />
                            <span>Upload File or Image</span>
                        </div>
                    )}
                </CldUploadWidget>

                {url && (
                    <span className="text-xs text-green-600 truncate">
                        File uploaded: {url.slice(0, 50)}...
                    </span>
                )}
            </div>

            {state.error && (
                <span className="text-red-500">Something went wrong!</span>
            )}
            <button className="bg-blue-500 text-white py-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};

export default ContentForm;
