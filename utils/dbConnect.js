import axios from 'axios';
import * as currency from 'currency.js';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";


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
export function Pre({obj}) {
  return <pre> {JSON.stringify(obj, null, 2)} </pre>;
}

export function getSum(sum1, sum2, sub) {
  return currency(sum1).add(sum2).subtract(sub); // => "13.68"
}

export async function post({ url, values }) {
  url = "/api/" + url;
  try {
    await axios
      .post(url, values)

      .then((res) =>
        toast(` Added Successfully `, {
          type: toast.TYPE.SUCCESS,
          autoClose: 1000,
        })
      )
      .catch((error) => {
        toast('Something went wrong, please try again', {
          type: toast.TYPE.ERROR,
          autoClose: 2000,
        });
      });
  } catch (error) {
    toast("Something went wrong please try again", {
      type: toast.TYPE.ERROR,
      autoClose: 2000,
    });
  }
}

export const handlePut = async ({ values, url, router }) => {
  const contentType = "application/json";
  const { id } = router.query;

  try {
    const res = await fetch(`/api/${url}?_id=${id}`, {
      method: "PUT",
      headers: {
        Accept: contentType,
        "Content-Type": contentType,
      },
      body: JSON.stringify(values),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      toast(
        ` Something went wrong, ${res.status} \n please try again`,

        {
          type: toast.TYPE.ERROR,
          autoClose: 2000,
        }
      );
    } else {
      toast(
        "Updated Successfully",

        {
          type: toast.TYPE.SUCCESS,
          autoClose: 2000,
        }
      );
    }
  } catch (error) {
    toast(
      ` Something went wrong, ${error} \n please try again`,

      {
        type: toast.TYPE.ERROR,
        autoClose: 2500,
      }
    );
    res.end;
  }
};

export const handleDelete = async ({ deleteUrl, id ,msg=true}) => {
  try {
    await fetch(`/api/${deleteUrl}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    }).then((res) =>
      res.json().then((res) => {
        if (res.ok) {
         if(msg) toast(
            ` Deleted Successfully`,

            {
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            }
          );
        } else {
          if(msg) toast(
            ` Something went wrong, ${res.status} \n please try again`,

            {
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            }
          );
     
        }
      })
    );
  } catch (error) {
    toast(
      ` Something went wrong, please try again`,

      {
        type: toast.TYPE.ERROR,
        autoClose: 2500,
      }
    );
  }
};

export const toPDF = (rows, columns, title) => {
  var doc = new jsPDF("p", "pt"); // l or p

  /*doc.autoTable(columns, ss, {
		/* 	styles: {
			cellPadding: 5,
			fontSize: 12,
			font: 'times', // helvetica, times, courier
			lineColor: 200,
			lineWidth: 0.1,
			fontStyle: 'normal', // normal, bold, italic, bolditalic
			overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
			fillColor: 255,
			textColor: 20,
			halign: 'center', // left, center, right
			valign: 'middle', // top, middle, bottom
			fillStyle: 'F', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
			minCellHeight: 20,
			cellWidth: 'auto', // 'auto', 'wrap' or a number },
		}, */
  /* 	columnStyles: {
			id: { fillColor: 255 },
		},
		margin: { top: 60 }, 
		didDrawPage: function (data) {
			doc.text('Employees Salary Details', 40, 30);
		},
		didParseCell: function (table) {
			if (table.section === 'head') {
				table.cell.styles.textColor = '#000000';
				table.cell.styles.fillColor = '#B2B2FF';
			}
		},
	});*/

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

