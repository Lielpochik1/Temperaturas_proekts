document.addEventListener("DOMContentLoaded", () => {
    const dateE1 = document.getElementById("datums");
    const minE1 = document.getElementById("minTemp");
    const maxE1 = document.getElementById("maxTemp");

    const tbody = document.querySelector("tbody");
    const summaryE1 = document.querySelector("span")

    const addBtn = document.querySelector(".btn");

    if (!dateE1 || !minE1 || !maxE1) {
        console.warn("Trūkst kāds no obligātajiem elementiem.");
        return;
    }




    addBtn.addEventListener("click", async (e) => {
        const date = (dateE1.value || "").trim();
        const min = parseFloat(minE1.value);
        const max = parseFloat(maxE1.value);

        const err = validateInput(date, min, max);
        if (err) {
            alert(err);
            return;
        }

        const newRecord = {date, min, max};
        records.push(newRecord));
        renderTable(tbody,records);
        renderOverallAverage(avg_summary, records);
        Form.reset();

    });

    //Palīgfunkcijas
    function validateInput(date, min, max) {
        if (!date) return "Lūdzu ievadi datumu.";
        if (Number.isNaN(min)) return "Lūdzu ievadi minimālo temperatūru.";
         if (Number.isNaN(max)) return "Lūdzu ievadi maksimālo temperatūru.";
         if (min > max) return "Minimāla temperatūra nevar būt lielaka par maksimāla";
         return null;
    }

    function calcDayAvg(min, max) {
        return (min + max) / 2
    }

    function renderTable(tbadyE1, items) {
        //notira tabulas rindas ar datiem
        tbadyE1.innerHTML = "";
        //jaunas tabulas datu rindu veidošana
        for (const it of items) {
            const avg = calcDayAvg(it.min, it.max);
            const tr = document. createElement("tr");
            tr.innerHTML = '
                <td class="date">${escapeHTML(it.date)}</td>
                <td class="num">${Number(it.min).toFixed(1)}</td>
                <td class="num">${Number(it.max).toFixed(1)}</td>
                <td class="num">${avg.toFixed(2)}</td>
            ';
                 
                 tbodyE1.appenChild(tr);


        }
    }

    function renderOverallAverage (avg_summary, items) {
        const avgs =items.map((it) => calcDayAvg(it.min, it.max));
        const overall = avgs.length ? avgs.reduce((a,b) => a + b, 0) / avgs.length;
        avg_summary.textContent = overall.toFixed(2);

    }

    function readRecordsFromTble(tbodyE1) {
        const row = Array.from(tbodyE1.querySelectrorall("tr"));

        out = [];
        for (const row of rows) {
            const tds = row.querySelectrorALL("td");
            if (tds.length < 3) continue;
            const date = (tds[0].textContent || "").trim();
            const min = parseFloat((tds[1].textContent || "")).replace(",", ".");
              const max = parseFloat((tds[2].textContent || "")).replace(",", ".");
              if (!date || Number.isNaN(min) || Number.isNaN(max)) continue;
              out.push({date, min, max});

        }
        return out;
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;")
    }