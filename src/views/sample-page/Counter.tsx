import axios from "axios";
import React, { useState, useEffect } from "react";

interface RowData {
  SerialNo: string;
  IpAddress: string;
  Seconds: number;
  OriginalSeconds: number; // Store the original countdown time
  Send: boolean; // Indicates whether to send HTTP request
}

const CountdownTable: React.FC<{ data: RowData[] }> = ({ data }) => {
  const [rows, setRows] = useState<RowData[]>(data);
  const [autoFetch, setAutoFetch] = useState(true);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRows((prevRows) =>
        prevRows.map((row) => ({
          ...row,
          Seconds: row.Seconds > 0 ? row.Seconds - 1 : row.OriginalSeconds, // Reset time to original value if it reaches 0
        }))
      );
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    rows.forEach(async (row) => {
      // Use async function

      if (
        row.Seconds === 0 &&
        autoFetch &&
        row.Send
        // row.SerialNo == "PIOT-030"
      ) {
        try {
          const response = await axios.get(
            `http://192.168.2.96:8080/api/piotCounter/counter?serialNo=${row.SerialNo}&ipAddress=${row.IpAddress}`
          );
          console.log(
            `HTTP request for ${row.SerialNo} ${row.IpAddress} complete.`
          );
          console.log(response);
        } catch (error) {
          console.error("Error occurred:", error);
        }
      }
    });
  }, [rows, autoFetch]);

  const handleManualFetch = (serialNo: string, ipAddress: string) => {
    // Trigger HTTP GET request
    fetch(
      `http://192.168.2.96:5000/serialNo:${serialNo}&IpAddress:${ipAddress}`
    )
      .then((response) => {
        // Handle response
        console.log(`HTTP request for ${serialNo} ${ipAddress} complete.`);
      })
      .catch((error) => {
        // Handle error
        console.error("Error occurred:", error);
      });
  };

  const handleCheckboxChange = (serialNo: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.SerialNo === serialNo ? { ...row, Send: !row.Send } : row
      )
    );
  };

  return (
    <div>
      <button onClick={() => setAutoFetch((prev) => !prev)}>
        {autoFetch ? "Disable Auto Fetch" : "Enable Auto Fetch"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>IP Address</th>
            <th>Seconds</th>
            <th>Action</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.SerialNo}>
              <td>{row.SerialNo}</td>
              <td>{row.IpAddress}</td>
              <td>{row.Seconds}</td>
              <td>
                <button
                  onClick={() =>
                    handleManualFetch(row.SerialNo, row.IpAddress)
                  }>
                  Manual Fetch
                </button>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={row.Send}
                  onChange={() => handleCheckboxChange(row.SerialNo)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Usage
const App: React.FC = () => {
  const initialData: RowData[] = [
    {
      SerialNo: "PIOT-038",
      IpAddress: "192.168.2.209",
      Seconds: 2,
      OriginalSeconds: 2,
      Send: false,
    },
    {
      SerialNo: "PIOT-028",
      IpAddress: "192.168.2.208",
      Seconds: 5,
      OriginalSeconds: 5,
      Send: true,
    },
    {
      SerialNo: "PIOT-031",
      IpAddress: "192.168.2.191",
      Seconds: 7,
      OriginalSeconds: 7,
      Send: true,
    },
    {
      SerialNo: "PIOT-029",
      IpAddress: "192.168.2.211",
      Seconds: 8,
      OriginalSeconds: 8,
      Send: true,
    },
    {
      SerialNo: "PIOT-037",
      IpAddress: "192.168.2.207",
      Seconds: 2,
      OriginalSeconds: 2,
      Send: true,
    },
    {
      SerialNo: "PIOT-003",
      IpAddress: "192.168.2.210",
      Seconds: 5,
      OriginalSeconds: 5,
      Send: true,
    },
    {
      SerialNo: "PIOT-014",
      IpAddress: "192.168.2.199",
      Seconds: 7,
      OriginalSeconds: 7,
      Send: true,
    },
    {
      SerialNo: "PIOT-012",
      IpAddress: "192.168.2.206",
      Seconds: 8,
      OriginalSeconds: 8,
      Send: true,
    },
    {
      SerialNo: "PIOT-040",
      IpAddress: "192.168.2.205",
      Seconds: 2,
      OriginalSeconds: 2,
      Send: true,
    },
    {
      SerialNo: "PIOT-002",
      IpAddress: "192.168.2.237",
      Seconds: 5,
      OriginalSeconds: 5,
      Send: true,
    },
    {
      SerialNo: "PIOT-026",
      IpAddress: "192.168.2.204",
      Seconds: 7,
      OriginalSeconds: 7,
      Send: true,
    },
    {
      SerialNo: "PIOT-010",
      IpAddress: "192.168.2.203",
      Seconds: 8,
      OriginalSeconds: 8,
      Send: true,
    },
    {
      SerialNo: "PIOT-021",
      IpAddress: "192.168.2.219",
      Seconds: 2,
      OriginalSeconds: 2,
      Send: true,
    },
    {
      SerialNo: "PIOT-024",
      IpAddress: "192.168.2.220",
      Seconds: 5,
      OriginalSeconds: 5,
      Send: true,
    },
    {
      SerialNo: "PIOT-018",
      IpAddress: "192.168.2.202",
      Seconds: 7,
      OriginalSeconds: 7,
      Send: true,
    },
    {
      SerialNo: "PIOT-030",
      IpAddress: "192.168.2.201",
      Seconds: 8,
      OriginalSeconds: 8,
      Send: true,
    },
    {
      SerialNo: "PIOT-008",
      IpAddress: "192.168.2.224",
      Seconds: 2,
      OriginalSeconds: 2,
      Send: true,
    },
    {
      SerialNo: "PIOT-017",
      IpAddress: "192.168.2.228",
      Seconds: 5,
      OriginalSeconds: 5,
      Send: true,
    },
    {
      SerialNo: "PIOT-023",
      IpAddress: "192.168.2.223",
      Seconds: 7,
      OriginalSeconds: 7,
      Send: true,
    },
    {
      SerialNo: "PIOT-011",
      IpAddress: "192.168.2.221",
      Seconds: 8,
      OriginalSeconds: 8,
      Send: true,
    },
    {
      SerialNo: "PIOT-013",
      IpAddress: "192.168.2.225",
      Seconds: 2,
      OriginalSeconds: 2,
      Send: true,
    },
    {
      SerialNo: "PIOT-007",
      IpAddress: "192.168.2.226",
      Seconds: 5,
      OriginalSeconds: 5,
      Send: true,
    },
    {
      SerialNo: "PIOT-004",
      IpAddress: "192.168.2.227",
      Seconds: 7,
      OriginalSeconds: 7,
      Send: true,
    },
    {
      SerialNo: "PIOT-025",
      IpAddress: "192.168.2.222",
      Seconds: 8,
      OriginalSeconds: 8,
      Send: true,
    },
    {
      SerialNo: "PIOT-034",
      IpAddress: "192.168.2.238",
      Seconds: 2,
      OriginalSeconds: 2,
      Send: true,
    },
    {
      SerialNo: "PIOT-006",
      IpAddress: "192.168.2.212",
      Seconds: 5,
      OriginalSeconds: 5,
      Send: true,
    },
    {
      SerialNo: "PIOT-020",
      IpAddress: "192.168.2.213",
      Seconds: 7,
      OriginalSeconds: 7,
      Send: true,
    },
    {
      SerialNo: "PIOT-035",
      IpAddress: "192.168.2.215",
      Seconds: 8,
      OriginalSeconds: 8,
      Send: true,
    },
    {
      SerialNo: "PIOT-009",
      IpAddress: "192.168.2.216",
      Seconds: 2,
      OriginalSeconds: 2,
      Send: true,
    },
    {
      SerialNo: "PIOT-005",
      IpAddress: "192.168.2.217",
      Seconds: 5,
      OriginalSeconds: 5,
      Send: true,
    },
    {
      SerialNo: "PIOT-001",
      IpAddress: "192.168.2.214",
      Seconds: 7,
      OriginalSeconds: 7,
      Send: true,
    },
    {
      SerialNo: "PIOT-016",
      IpAddress: "192.168.2.233",
      Seconds: 8,
      OriginalSeconds: 8,
      Send: true,
    },
    {
      SerialNo: "PIOT-015",
      IpAddress: "192.168.2.234",
      Seconds: 2,
      OriginalSeconds: 2,
      Send: true,
    },
    {
      SerialNo: "PIOT-032",
      IpAddress: "192.168.2.232",
      Seconds: 5,
      OriginalSeconds: 5,
      Send: true,
    },
    {
      SerialNo: "PIOT-033",
      IpAddress: "192.168.2.231",
      Seconds: 7,
      OriginalSeconds: 7,
      Send: true,
    },
    {
      SerialNo: "PIOT-019",
      IpAddress: "192.168.2.229",
      Seconds: 8,
      OriginalSeconds: 8,
      Send: true,
    },
    {
      SerialNo: "PIOT-039",
      IpAddress: "192.168.2.230",
      Seconds: 2,
      OriginalSeconds: 2,
      Send: true,
    },
    {
      SerialNo: "PIOT-027",
      IpAddress: "192.168.2.235",
      Seconds: 5,
      OriginalSeconds: 5,
      Send: true,
    },
    {
      SerialNo: "PIOT-036",
      IpAddress: "192.168.2.236",
      Seconds: 7,
      OriginalSeconds: 7,
      Send: true,
    },
  ];

  return (
    <div>
      <h1>Countdown Table</h1>
      <CountdownTable data={initialData} />
    </div>
  );
};

export default App;
