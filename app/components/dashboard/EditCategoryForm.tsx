"use client";

import { editCategory } from "@/app/actions";
import useCategories from "@/app/lib/hooks/useCategories";
import { UploadDropzone } from "@/app/lib/uplaodthing";
import { categorySchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../SubmitButtons";

interface iAppProps {
    data: {
        id: string;
        name: string;
        title: string;
        image: string;
    };
}

export function EditCategoryForm({ data }: iAppProps) {
    const [image, setImage] = useState<string>(data.image);
    const [lastResult, action] = useFormState(editCategory, undefined);
    const { categories, loading, error } = useCategories();
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: categorySchema });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    const handleDelete = () => {
        setImage("");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading categories: {error.message}</p>;
    }

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <input type="hidden" name="categoryId" value={data.id} />
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/categoryId">
                        <ChevronLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">Edit Category</h1>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Category Details</CardTitle>
                    <CardDescription>
                        In this form you can update your category
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input
                                type="text"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={data.name}
                                className="w-full"
                                placeholder="Category Name"
                            />

                            <p className="text-red-500">{fields.name.errors}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>Title</Label>
                            <Textarea
                                key={fields.title.key}
                                name={fields.title.name}
                                defaultValue={data.title}
                                placeholder="Write your description right here..."
                            />
                            <p className="text-red-500">{fields.title.errors}</p>
                        </div>


                        <div className="flex flex-col gap-3">
                            <Label>Image</Label>
                            <input
                                type="hidden"
                                value={image}
                                key={fields.image.key}
                                name={fields.image.name}
                                defaultValue={fields.image.initialValue as any}
                            />
                            {image.length > 0 ? (
                                <div className="flex gap-5">

                                    <div key={image} className="relative w-[100px] h-[100px]">
                                        <Image
                                            height={100}
                                            width={100}
                                            src={image}
                                            alt="Product Image"
                                            className="w-full h-full object-cover rounded-lg border"
                                        />

                                        <button
                                            onClick={() => handleDelete()}
                                            type="button"
                                            className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                                        >
                                            <XIcon className="w-3 h-3" />
                                        </button>
                                    </div>

                                </div>
                            ) : (
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        setImage(res[0].url);
                                    }}
                                    onUploadError={() => {
                                        alert("Something went wrong");
                                    }}
                                />
                            )}

                            <p className="text-red-500">{fields.image.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton text="Edit Category" />
                </CardFooter>
            </Card>
        </form>
    );
}
