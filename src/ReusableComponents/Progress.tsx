import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import clsx from "clsx";
import { Stage } from "../types/api";
import { completeStageThunk, fetchStagesThunk } from "../redux/thunks/stagesThunks";

interface ProgressProps {
    serviceId?: number;
}

const Progress: React.FC<ProgressProps> = ({ serviceId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, stagesStatus } = useSelector((state: RootState) => state.stage);
    const { completeStatus } = useSelector((state: RootState) => state.stage);
    const [modalData, setModalData] = useState<Stage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [responseLoading, setResponseLoading] = useState(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const isLoading = useMemo(() => stagesStatus === "loading" || stagesStatus === "idle", [stagesStatus]);

    useEffect(() => {
        if (serviceId) {
            dispatch(fetchStagesThunk(serviceId));
        }
    }, [dispatch, serviceId]);

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.currentTarget.files || []);
        setSelectedImages([...selectedImages, ...files]);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...newPreviews]);

        // You can dispatch the files here
        // dispatch(uploadImages(serviceId, files));
    };

    const createFormData = (files: File[]) => {
        const formData = new FormData();
        console.log(files);
        files.forEach((file) => {
            formData.append("images", file); // "images" should match your backend field name
        });
        return formData;
    };

    const uploadImages = () => {
        const formData = createFormData(selectedImages);
        if (modalData?.id && formData) {
            dispatch(completeStageThunk({ stageId: modalData.id, formData }));
        }
        // You can now dispatch this
        // dispatch(uploadImages(serviceId, formData));
    }
    useEffect(() => {
        if (completeStatus === 'succeeded') {
            setModalData(null)
            setSelectedImages([])
            setPreviewUrls([])
            window.location.reload();
        }
    }, [completeStatus])
    const removePhoto = (index: number) => {
        const selectedImageName = selectedImages[index]?.name
        const newImages = Array.from(selectedImages).filter(image => image.name !== selectedImageName)
        setSelectedImages(newImages)
        setPreviewUrls(newImages.map((file) => URL.createObjectURL(file)));
    }

    const stageCount = data.length;

    return (
        <div className="w-full flex flex-col gap-1 justify-start items-start">
            {isLoading && <h2 className="self-center">ჩატვირთვა...</h2>}
            <div
                className={clsx(
                    "grid w-full py-0.5 grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
                )}
                style={{
                    gridTemplateColumns: !isLoading && stageCount < 8 ? `repeat(${stageCount}, minmax(0, 1fr))` : undefined,
                }}
            >
                {isLoading
                    ? Array.from({ length: 11 }).map((_, i) => (
                        <div
                            key={i}
                            className="group h-full w-full animate-pulse border relative flex justify-center items-center bg-grayish"
                        ></div>
                    ))
                    : data.map((stage, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setModalData(stage);
                                openModal();
                            }}
                            // disabled={!stage.is_completed}
                            className={clsx(
                                "group h-full w-full border relative",
                                stage.is_completed
                                    ? "bg-main-color text-grayish"
                                    : "bg-grayish text-main-color"
                            )}
                        >
                            <div className="absolute group-hover:flex hidden justify-center items-center flex-col bottom-[110%] w-full">
                                <div
                                    className={clsx(
                                        "w-full border-2 text-sm py-3 px-1 rounded-2xl",
                                        stage.is_completed
                                            ? "bg-main-color text-grayish"
                                            : "bg-grayish text-main-color"
                                    )}
                                >
                                    {stage.name} (
                                    {stage.is_completed ? "შესრულებული" : "დაუსრულებელი"})
                                </div>
                                <div
                                    className={clsx(
                                        "w-[10px] border-b-2 h-[5px]  rounded-b-full",
                                        stage.is_completed ? "bg-main-color" : "bg-grayish"
                                    )}
                                ></div>
                            </div>
                            <div
                                className={clsx(
                                    "text-sm font-bold z-20",
                                    stage.is_completed ? "text-grayish" : "text-main-color"
                                )}
                            >
                                {i + 1}
                            </div>
                        </button>
                    ))}
            </div>

            {isModalOpen && modalData && (
                <div className="fixed top-0 left-0 w-dvw h-dvh z-50 flex justify-center items-center">
                    {/* Backdrop */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-40" />

                    {/* Modal content */}
                    <div className="bg-white absolute p-5 z-40 w-screen h-screen md:w-4/5 md:h-4/5 flex flex-col">
                        <h2 className="text-lg font-semibold mb-4">{modalData.name}</h2>
                        <button onClick={() => setModalData(null)} className="bg-main-color w-10 h-10 font-bold text-2xl text-grayish rounded-lg flex items-center justify-center cursor-pointer absolute right-3">X</button>
                        <p>სტატუსი: {modalData.is_completed ? "შესრულებული" : "დაუსრულებელი"}</p>

                        {/* Image Upload Input */}
                        <div className="mt-4">
                            <label className="block mb-2 text-2xl font-medium text-gray-700">აარჩიეთ ფოტოები:</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple={true}
                                onChange={handleImageChange}
                                className="block w-full text-xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            />
                        </div>

                        {/* Preview Selected Images */}

                        <div className="mt-4 overflow-x-auto whitespace-nowrap flex gap-x-4">
                            {modalData.images.map((img, index) => {
                                return (<div
                                    key={index}
                                    className="relative min-w-[300px] max-w-[300px] h-[400px] inline-block"
                                >
                                    <img
                                        src={import.meta.env.VITE_URL + img.url}
                                        alt={`Selected ${index + 1}`}
                                        className="w-full h-full object-cover rounded border"
                                    />
                                    <button
                                        onClick={() => removePhoto(index)}
                                        className="absolute top-2 left-2 bg-white p-2 rounded shadow text-sm"
                                    >
                                        X წაშლა
                                    </button>
                                </div>)
                            })}
                            {previewUrls.map((url, index) => (
                                <div
                                    key={index}
                                    className="relative min-w-[300px] max-w-[300px] h-[400px] inline-block"
                                >
                                    <img
                                        src={url}
                                        alt={`Selected ${index + 1}`}
                                        className="w-full h-full object-cover rounded border"
                                    />
                                    <button
                                        onClick={() => removePhoto(index)}
                                        className="absolute top-2 left-2 bg-white p-2 rounded shadow text-sm"
                                    >
                                        X წაშლა
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button className="bg-green-500 mt-10 flex justify-center items-center gap-x-2 text-white p-5 text-2xl font-bold cursor-pointer" disabled={selectedImages.length === 0} onClick={() => uploadImages()}>
                            <span>ატვირთვა</span>
                            {completeStatus === 'loading' &&
                                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            }
                        </button>
                    </div>
                </div>
            )
            }

        </div >
    );
};

export default Progress;
