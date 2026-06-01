export const downloadPDF = (pdf: Blob) => {
	const fileName = "game.pdf";
	const fileURL = URL.createObjectURL(pdf);
	const a = document.createElement("a");
	a.href = fileURL;
	a.download = fileName;
	a.click();
};
