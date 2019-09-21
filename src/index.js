import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { BannerComponent, BannerItem } from "./lib";
import { WindowControlUtils } from "./lib/utils";

const pc_banners = [
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5876703202246656/media/upperBanner",
    link:
      "https://www.lezhin.com/ko/page/shocking_sale180416_all?utm_source=lz&utm_medium=banner&utm_campaign=shocking_sale180416_allutm_content=hero",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5016845850640384/media/upperBanner",
    link:
      "https://www.lezhin.com/ko/page/sale180412_all?utm_source=lz&utm_medium=banner&utm_campaign=sale180412_allutm_content=hero",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/4537033910124544/media/upperBanner",
    link: "https://www.lezhin.com/ko/page/sale1704W1_ALL",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5439666241929216/media/upperBanner",
    link: "https://www.lezhin.com/ko/comic/dalbox",
  },
  new BannerItem({
    image:
      "https://cdn.lezhin.com/v2/inventory_items/6120926790549504/media/upperBanner",
    link: "https://www.lezhin.com/ko/novel/leviathan",
  }),
];

const mobile_banners = [
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5876703202246656/media/upperBannerMobile",
    link:
      "https://www.lezhin.com/ko/page/shocking_sale180416_all?utm_source=lz&utm_medium=banner&utm_campaign=shocking_sale180416_allutm_content=hero",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5016845850640384/media/upperBannerMobile",
    link:
      "https://www.lezhin.com/ko/page/sale180412_all?utm_source=lz&utm_medium=banner&utm_campaign=sale180412_allutm_content=hero",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/4537033910124544/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/page/sale1704W1_ALL",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5439666241929216/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/comic/dalbox",
  },
  new BannerItem({
    image:
      "https://cdn.lezhin.com/v2/inventory_items/6120926790549504/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/novel/leviathan",
  }),
];

const isMobile = WindowControlUtils.isMobile(window);
const mock = new MockAdapter(axios);

function getBanners(device = isMobile ? "mobile" : "desktop", count = 4) {
  mock.onGet("/banners", { params: { device, count } }).reply(200, {
    banners: device === "mobile" ? mobile_banners : pc_banners,
  });
  return axios.get("/banners", { params: { device, count } });
}

window.addEventListener("resize", event => {
  if (isMobile !== WindowControlUtils.isMobile(window)) {
    isMobile = WindowControlUtils.isMobile(window);
    BannerView();
  }
});

const app = document.getElementById("app");
console.error("@@", app);

const BannerView = () => {
  getBanners().then(response => {
    console.error("@@", response);
    const banners = response.data.banners;
    new BannerComponent({
      banners,
      infinity: true,
      autoSlide: true,
      time: 3000,
      target: app,
    }).view();
  });
};

BannerView();
