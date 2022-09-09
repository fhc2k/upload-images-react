export const ConvertToObject = (array) => {
    array.reduce(
        (obj, item, index) => ({
            ...obj,
            [index]: {
                file: item,
                uploading: false,
                error: false,
                done: false,
                url: null,
            },
        }),
        {}
    )
};

/**
 * Acceder a propiedad computada
 * const handleDeleteFile = (indexFile) => {
		const { [indexFile] : _, ...rest } = state;
		setState(rest);
	};
 */