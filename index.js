import puppeteer from 'puppeteer';
import fs from 'fs';
import Config from './data.js';

(async () => {
    // URL ejemplo de Amazon
    // const URL = 'https://www.amazon.com/s?k=programmer+socks&__mk_es_US=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1LI005L8VPZRP&sprefix=programmer+sock%2Caps%2C240&ref=nb_sb_noss_1';
    // URL ejemplo de Coto
    const URL = 'https://www.cotodigital.com.ar/sitios/cdigi/categoria/catalogo-almac%C3%A9n-infusiones-mate-yerba/_/N-1l1pjhf?Dy=1&Nf=product.startDate%7CLTEQ%201.7378496E12%7C%7Cproduct.endDate%7CGTEQ%201.7378496E12&Nr=AND(product.sDisp_200:1004,product.language:espa%C3%B1ol,OR(product.siteId:CotoDigital))&assemblerContentCollection=%2Fcontent%2FShared%2FAuto-Suggest%20Panels';
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    });
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle2' });

    const tittle = await page.title();
    console.log(tittle);

    let products = [];
    let nextPage = true;

    while (nextPage) {
        const newProducts = await page.evaluate(() => {
            const products = Array.from(
                // document.querySelectorAll(".puis-card-container.s-card-container")
                document.querySelectorAll(".centro-precios") // Coto
            );
            
            return products.map((product) => {
                // const title = product.querySelector(".a-text-normal")?.innerText;
                // const priceWhole = product.querySelector(".a-price-whole")?.innerText;
                // const priceFraction = product.querySelector(".a-price-fraction")?.innerText;
                
                const title = product.querySelector("h3")?.innerText;
                const priceWhole = product.querySelector("h4")?.innerText;

                if (!priceWhole) {
                    return {
                        title,
                        price: "",
                    }
                }

                const priceWholeCleaned = priceWhole.replace(/\n/g, "").trim()
                // const priceFractionCleaned = priceFraction.replace(/\n/g, "").trim()

                return {
                    title,
                    price: priceWholeCleaned//`${priceWholeCleaned}${priceFractionCleaned}`
                }
            });
        });
        
        products = [...products, ...newProducts];

        nextPage = await page.evaluate(() => {
            // const nextButton = document.querySelector(".s-pagination-next");
            const nextButton = document.querySelector(".fa-angle-right"); // Coto
            console.log(nextButton);
            
            // if (
            //     nextButton &&
            //     !nextButton.classList.contains("s-pagination-disabled")
            // ) {
            //     nextButton.click();
            //     return true;
            // }
            
            if (nextButton.innerText === "Siguiente") {
                nextButton.click();
                return true;
            }

            return false;
        });

    }
    // fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    await browser.close();
    
})();