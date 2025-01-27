const Config = {
    name: "Coto",
	URL: "https://www.cotodigital.com.ar/sitios/cdigi/categoria/catalogo-almac%C3%A9n-infusiones-mate-yerba/_/N-1l1pjhf?Dy=1&Nf=product.startDate%7CLTEQ%201.7378496E12%7C%7Cproduct.endDate%7CGTEQ%201.7378496E12&Nr=AND(product.sDisp_200:1004,product.language:espa%C3%B1ol,OR(product.siteId:CotoDigital))&assemblerContentCollection=%2Fcontent%2FShared%2FAuto-Suggest%20Panels",
    browser: {
        headless: false,
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    },
    page: {
        waitUntil: "networkidle2",
    },
    querySelectorAll: ".centro-precios",
    querySelector: ['h3', 'h4'],
    nextButton: ".fa-angle-right",
};

export default Config;