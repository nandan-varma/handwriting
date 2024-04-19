import { UploadButton } from "@/utils/uploadthing";
import { FontSelector } from "./font-selector";

export function Beta() {
    return (
        <>
            <div className="pt-10 px-5 flex flex-col sm:flex-row items-center gap-4 font-semibold justify-center">
                <UploadButton
                    endpoint="TTFuploader"
                    onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                    }}
                />
                <FontSelector/>
            </div>
        </>
    );
}