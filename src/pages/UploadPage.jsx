import { useAppContext } from "../context/AppContext";
import { useClipboard } from "../hooks/useClipboard";
import { Dropzone } from "../components/Dropzone";
import { RaceBy } from "@uiball/loaders";

export const UploadPage = () => {
	let content = null;
	const { dispatch, state: { state, url } } = useAppContext();
	const [stateClipboard, setClipboard] = useClipboard("Copy");

	if (state === "upload") {
		content = <Dropzone />;
	}

	if (state === "uploading") {
		content = (
			<div className="box w-64">
				<h2 className="text-base font-medium text-black">
					Uploading...
				</h2>
				<RaceBy size={100} lineWeight={5} speed={1.4} color="black" />
			</div>
		);
	}

	if (state === "done") {
		content = (
			<div className="max-w-full sm:max-w-[60%] md:max-w-xs box">
				<h2 className="text-base font-medium text-black">
					Upload sucessfully!
				</h2>
				<img
					className="w-full h-auto object-contain rounded-xl"
					src={url}
				/>
				<div className="flex items-center gap-2 rounded-lg">
					<input
						className="form__field__text"
						readOnly={true}
						value={url}
					/>
					<button
						className="button button--primary"
						onClick={() => setClipboard(url)}
					>
						{stateClipboard}
					</button>
				</div>
				<button
					className="button button--secondary"
					onClick={() => dispatch({ type: "reset" })}
				>
					Back
				</button>
			</div>
		);
	}

	return (
		<section className="w-full min-h-full grid place-items-center p-4">
			{content}
		</section>
	);
};
