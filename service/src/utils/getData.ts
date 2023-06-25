import cheerio from "cheerio";
import axios from "axios";

const BASE_URL = "https://cet6.koolearn.com/20181225/825301.html";

export const getData = async (word: string = "A") => {
  const dataRes = [];
  const upperWord = word[0].toUpperCase();
  const i = upperWord.charCodeAt(0) - "A".charCodeAt(0);
  const res = (await axios.get(BASE_URL)).data;
  const $ = cheerio.load(res);
  const data = $("td div strong a");
  const url = data[i]?.attribs["href"];
  const res2 = (await axios.get(url)).data;
  const $2 = cheerio.load(res2);
  const data2 = $2("div.xqy_core_text").children("p");
  data2.each((_, el) => {
    el.children.forEach((val) => {
      // @ts-ignore
      const str = (val?.data || " ") as string;
      for (let i = 0; i < str.length; i++) {
        const ascii = str.charCodeAt(i);
        if ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
          const word = str.split(" ")[0].trim().replace("/", "");
          dataRes.push(word);
          break;
        }
      }
    });
  });
  return dataRes;
};
