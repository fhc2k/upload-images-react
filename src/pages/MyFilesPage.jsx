import { useAppContext } from "../context/AppContext";
import { CardFile } from "../components/CardFile";
import { useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";
import { useState } from "react";

export const MyFilesPage = () => {
	const { state: { data, isLoading } } = useAppContext();
	const navigate = useNavigate();

	if (isLoading) {
		return (
			<section className="w-full h-screen grid place-items-center">
				<Ring size={50} lineWeight={5} speed={2} color="#2563eb" />
			</section>
		);
	}

	if (data.length) {
		return (
			<section className="w-full flex flex-col gap-6 min-h-full overflow-auto">
				<div className="flex flex-col gap-2">
					<h1 className="text-xl font-medium text-black">
						My Files - {data.length}
					</h1>
					<p className="text-sm">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
				<div className="flex flex-wrap gap-8">
					{data.map((item) => (
						<CardFile key={item.fileUid} data={item} />
					))}
				</div>
			</section>
		);
	}

	return (
		<section className="w-full min-h-full grid place-items-center">
			<div className="flex flex-col gap-8 items-center justify-center text-center">
				<p className="text-xl font-medium text-blue-500">
					You don't have uploaded images!
				</p>
				<button
					onClick={() => navigate("/upload")}
					className="button button--primary"
				>
					Start uploading images
				</button>
			</div>
		</section>
	);
};
