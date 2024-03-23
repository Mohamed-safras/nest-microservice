// import { CellHyperlinkValue, CellRichTextValue, ValueType } from "exceljs";
// import * as moment from 'moment';
import { CourseDescCharLength } from "@app/common";

// const isCalgrowsURL = (url: string) => url.includes("calgrows.org");

// export const decorateEmail = (text: string) => {
//   let regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
//   return text.replace(regex, "<a href='mailto:$1'>$1</a>");
// };

// export const convertToHTML = (cell: any): string => {
//   const type = cell.type;
//   const value = cell.value;
//   let enrichText = "";

//   switch (type) {
//     case ValueType.Hyperlink:
//       const cellHyperlinkValue: CellHyperlinkValue = value;
//       const { hyperlink, text } = cellHyperlinkValue;

//       if (typeof text === "string") {
//         enrichText = text;
//       } else if (typeof text === "object") {
//         const { richText } = text as any;
//         richText.forEach((el) => {
//           enrichText = enrichText + el.text;
//         });
//       }

//       if (isCalgrowsURL(hyperlink)) {
//         enrichText = enrichText.replace("target='_blank'", "");
//       }

//       if (!enrichText.includes('<a href="')) {
//         enrichText = formatLinksInParagraph(enrichText);
//       }

//       const finalHTML = enrichText.replace(/\n/g, "<br><br>");

//       return finalHTML;

//     case ValueType.RichText:
//       const htmlTxts = [];
//       const cellRichTextValue: CellRichTextValue = value;
//       cellRichTextValue.richText.forEach((e) => {
//         const { font, text } = e;
//         if (font) {
//           const { size, italic, underline, bold } = font;
//           if (italic) {
//             htmlTxts.push("<em style='font-size:" + size + "'>" + text + "</em>");
//           } else if (bold) {
//             htmlTxts.push("<strong style='font-size:" + size + "'>" + text + "</strong>");
//           } else if (underline) {
//             htmlTxts.push("<u style='font-size:" + size + "'>" + text + "</u>");
//           } else {
//             htmlTxts.push("<span style='font-size:" + size + "'>" + text + "</span>");
//           }
//         } else {
//           htmlTxts.push(text);
//         }
//       });

//       return htmlTxts.join(" ").replace(/\n/g, "<br><br>");

//     default:
//       return cell.text.toString().replace(/\n/g, "<br><br>");
//   }
// };

export const enrichCourseDesc = (text: string): string => {
  let desc = text.split("\n").join("<br>");
  const charactors = ["•"];
  charactors.forEach(element => {
    desc = desc.split(element).join(`&nbsp; &nbsp; ${element}`);
  });
  return desc;
};

export const formatLinksInParagraph = (paragraph) => {
  const urlPattern = /https?:\/\/[^\s.,]+(?:\.[^\s.,]+)+/g;

  const formattedParagraph = paragraph.replace(urlPattern, (url) => {
    const encodedUrl = encodeURI(url);
    return `<a href="${encodedUrl}" target="_blank">${encodedUrl}</a>`;
  });

  return formattedParagraph;
};

// export const convertTimeTo12Hour = (timeArray: string[]): string[] => {
//   let time: string[] = [];
//   for (let i = 0; i < timeArray.length; i++) {
//     time.push(moment(timeArray[i], "HH.mm").format("hh:mm A"));
//   }
//   return time;
// }

// export const convertTimeTo24Hour = (times: string[]): number[] => {
//   const timeArray: number[] = []
//   for (const time of times) {
//     timeArray.push(Number(moment(time, "hh:mm A").format("HH.mm") as unknown as number))
//   }
//   return timeArray;
// }

export const filterDates2 = (dateArray: Date[], key: string) => {
  //return convertDateFormat(dateArray?.map(dateObject => dateObject?.[key]).filter(key => key !== null).flat())
  return (dateArray?.map(dateObject => dateObject?.[key]).filter(key => key !== null).flat())

}

// export const filterDates = (dateArray: Date[], key: string) => {
//   return convertDateFormat(dateArray?.map(dateObject => dateObject?.[key]).filter(key => key !== null).flat())
// }

// export const convertDateFormat = (dates: string[]): string[] => {
//   const dateArray: string[] = []
//   for (const date of dates) {
//     dateArray.push(moment(new Date(date)).format('MM/DD/YYYY'))
//   }
//   return dateArray;
// }

export const getCharacterLengthWithoutTags = (text: string) => {
  const str = text
  const withoutTags = str?.replace(/<[^>]+>/g, '');

  if (withoutTags?.length > CourseDescCharLength.MAXXCHARLEN) {
    return false
  }
  return true;
}

export const dateTimeFormater = (date:Date)=>{
  return new Date(date).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'});
}

export const convertTimeToMinutes = (timeString: string): number =>{
  const [hours, minutes] = timeString.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error("Invalid time format");
  }

  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}

export const convertToDate = (dateString) => {
  
  const [month, day, year] = dateString.split('/');
  const userDate = new Date(year, month - 1, day);
  // Get the user's timezone offset in minutes
  const userTimezoneOffset = userDate.getTimezoneOffset();
  const utcDate = new Date(userDate.getTime() + userTimezoneOffset * 60000);
  return utcDate;

};