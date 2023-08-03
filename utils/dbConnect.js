
import state from "@components/store";
import axios from "axios";
import currency from "currency.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function jsonify(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const OMR = (value) =>
  currency(value, {
    symbol: "OMR ",
    decimal: ".",
    separator: ",",
    precision: 3,
  });

export function toCurrency(number) {
  return OMR(number).format();
}

export function addCurrency(sell, a, b) {
  let result = toCurrency(sell);
  const expense = currency(a).add(b);
  result = currency(result).subtract(expense);
  return result;
}

export function getSum(sum1, sum2, sub) {
  return currency(sum1).add(sum2).subtract(sub); // => "13.68"
}

export async function Post({ url, values, toast, type }) {
  try {
    await axios
      .post(url, values)
      .then(() =>
        toast({
          title: "Added Successfully",
          description: `${type} Added Successfully`,
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      )
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong please try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong please try again",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

export const handlePut = async ({ values, url, type, toast }) => {
  const contentType = "application/json";

  try {
    const res = await fetch(
      url,
      {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },

        body: JSON.stringify(values),
      },
      {
        next: {
          cache: "no-store",
        },
      }
    );

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      toast({
        title: "Error",
        description: "Something went wrong please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Updated Successfully",
        description: `${type} Updated Successfully`,
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong please try again",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};

export const handleDelete = async ({ deleteUrl, type, toast, router }) => {
  try {
    await fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.done) {
          state.isDeleted = res.done;
          toast({
            title: "Deleted Successfully",
            description: `${type} Deleted Successfully`,
            status: "success",
            duration: 2500,
            isClosable: true,
          });

          if (router) router.back();
        } else {
          toast({
            title: "Error",
            description: "Something went wrong please try again",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          state.isDeleted = false;
        }
      });
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong please try again",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    state.isDeleted = false;
  }
};

export const toPDF = (rows, columns, title) => {
  const doc = new jsPDF("p", "pt"); // l or p

  const totalPagesExp = "{total_pages_count_string}";

  doc.autoTable({
    columns: columns,
    body: rows,
    headStyles: {
      halign: "center",
      fillColor: "#c3e5eb",
      textColor: "#333333",

      fontSize: 9,
    },

    styles: {
      fillStyle: "F", // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
      minCellHeight: 20,
      cellWidth: "wrap", // 'auto', 'wrap' or a number },
      valign: "middle", // top, middle, bottom
      overflow: "linebreak", // visible, hidden, ellipsize or linebreak
      cellPadding: 4,
      fontSize: 9,
      font: "times", // helvetica, times, courier
      lineColor: 200,
      lineWidth: 0.1,
      halign: "center",
      fontStyle: "normal", // normal, bold, italic, bolditalic
    },
    didDrawPage: (data) => {
      if (doc.internal.getNumberOfPages() === 1) {
        doc.setFontSize(12);
        doc.text(title, 350, 30, "right");
      }

      let footerStr = "Page " + doc.internal.getNumberOfPages();
      if (typeof doc.putTotalPages === "function") {
        footerStr = footerStr + " of " + totalPagesExp;
      }
      doc.setFontSize(8);
      doc.text(
        footerStr,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
    },
  });
  if (typeof doc.putTotalPages === "function") {
    doc.putTotalPages(totalPagesExp);
  }

  doc.save("table.pdf");
};
