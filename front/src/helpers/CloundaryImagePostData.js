/**
 * https://cloudinary.com/
 * @param file
 * @returns {Promise<FormData>}
 */
export const CloundaryImagePostData = async (image) => {
	const data = new FormData();
	await data.append('file', image);
	data.append('upload_preset', 'instagram-clone');
	data.append('cloud_name', 'mario0284');
	return data;
};
