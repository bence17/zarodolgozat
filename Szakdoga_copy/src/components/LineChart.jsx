import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import useOraAllasok from "../hooks/useOraallasok";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

// Main colors
ChartJS.defaults.backgroundColor = "#fff";
ChartJS.defaults.borderColor = "rgba(54, 162, 235, 0.5)";
ChartJS.defaults.color = "#fff";

ChartJS.defaults.font.weight = "800";

const LineChart = () => {
  const [mounted, setMounted] = useState(false);
  const { data: oraAllasok, error, isLoading } = useOraAllasok();

  // Dates on the bottom line
  const labels = React.useMemo(() => {
    return Array.isArray(oraAllasok)
      ? oraAllasok.map((item, i) => {
          const datum = new Date(item.datum);
          const elozoDatum = new Date(oraAllasok[i - 1]?.datum);
          if (elozoDatum) {
            if (datum.getMonth() !== elozoDatum.getMonth()) {
              return [
                format(datum, "MMMM do", {
                  locale: hu,
                }),
                format(datum, "MMMM", {
                  locale: hu,
                }),
              ];
            }
          }

          return format(datum, "MMMM do", {
            locale: hu,
          });
        })
      : [];
  }, [oraAllasok]);

  const data = {
    //Labels az adatokhoz tartozó dátumot tartalmazza, a datasets pedig a hozzá tartozó adatokat
    labels,
    datasets: [
      {
        label: "Gáz",
        data: oraAllasok?.map((item) => item.gaz),
        borderColor: "rgba(14, 233, 87, 0.88)",
        backgroundColor: "rgba(14, 233, 87, 0.88)",
      },
      {
        label: "Villany",
        data: oraAllasok?.map((item) => item.villany),
        borderColor: "rgb(255, 229, 4, 0.88)",
        backgroundColor: "rgba(255, 229, 4, 0.88)",
      },
      {
        label: "Víz",
        data: oraAllasok?.map((item) => item.viz),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235)",
      },
    ],
  };
  // Csak akkor fut le ha az oraAllasok állapota megváltozik
  useEffect(() => {
    setMounted(true);
  }, [oraAllasok]);

  if (isLoading || !mounted) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Line
        className="w-screen max-w-5xl"
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Óraállások",
              font: {
                size: "20",
              },
            },
            zoom: {
              limits: {
                y: {
                  min: 0,
                },
              },
              pan: {
                enabled: true,
                mode: "x",
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                drag: {
                  // enabled: true,
                },
                pinch: {
                  // enabled: true,
                },
                mode: "x",
              },
            },
          },
        }}
        data={data}
      />
    </motion.div>
  );
};

export default LineChart;
