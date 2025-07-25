"use client";

import {
  deleteGroup,
  deleteAssessment,
  deleteClient,
  deleteAdvisor,
  deleteRegulation,
  deleteSupervisor,
  deleteContent
} from "@/lib/actions";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";



type DeleteActionMap = {
  [key in 'regulation' | 'group' | 'advisor' | 'client' | 'assessment' |
   'supervisor' | 'content']:
  (
    prevState: { success: boolean; error: boolean },
    formData: FormData
  ) => Promise<{ success: boolean; error: boolean }>
};



const deleteActionMap = {
  regulation: deleteRegulation,
  group: deleteGroup,
  advisor: deleteAdvisor,
  client: deleteClient,
  assessment: deleteAssessment,
  supervisor: deleteSupervisor,
  content: deleteContent
} as const

const AdvisorForm = dynamic(() => import("./forms/AdvisorForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClientForm = dynamic(() => import("./forms/ClientForm"), {
  loading: () => <h1>Loading...</h1>,
});
const RegulationForm = dynamic(() => import("./forms/RegulationformForm"), {
  loading: () => <h1>Loading...</h1>,
});
const GroupForm = dynamic(() => import("./forms/GroupForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AssessmentForm = dynamic(() => import("./forms/AssessmentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ContentForm = dynamic(() => import("./forms/ContentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  regulation: (setOpen, type, data, relatedData) => (
    <RegulationForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  group: (setOpen, type, data, relatedData) => (
    <GroupForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  advisor: (setOpen, type, data, relatedData) => (
    <AdvisorForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  client: (setOpen, type, data, relatedData) => (
    <ClientForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  assessment: (setOpen, type, data, relatedData) => (
    <AssessmentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  content: (setOpen, type, data, relatedData) => (
    <ContentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
}

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: Omit<FormContainerProps, 'table'> & {
  table: keyof typeof deleteActionMap;
  relatedData?: any;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${table} has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text" name="id" value={id} hidden readOnly />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
