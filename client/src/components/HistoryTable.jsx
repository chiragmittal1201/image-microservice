function HistoryTable({ history }) {
  const formatBytes = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.08)",
        marginTop: "20px"
      }}
    >
      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        Upload History
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "12px",
                textAlign: "left",
                borderBottom:
                  "2px solid #e5e7eb"
              }}
            >
              File Name
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "center",
                borderBottom:
                  "2px solid #e5e7eb"
              }}
            >
              Original Size
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "center",
                borderBottom:
                  "2px solid #e5e7eb"
              }}
            >
              Compressed Size
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "center",
                borderBottom:
                  "2px solid #e5e7eb"
              }}
            >
              Saved %
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "center",
                borderBottom:
                  "2px solid #e5e7eb"
              }}
            >
              Upload Date
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "center",
                borderBottom:
                  "2px solid #e5e7eb"
              }}
            >
              Compressed
            </th>

            <th
              style={{
                padding: "12px",
                textAlign: "center",
                borderBottom:
                  "2px solid #e5e7eb"
              }}
            >
              Processed
            </th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr
              key={index}
              style={{
                borderBottom:
                  "1px solid #f0f0f0"
              }}
            >
              <td
                style={{
                  padding: "12px"
                }}
              >
                {item.filename}
              </td>

              <td
                style={{
                  padding: "12px",
                  textAlign: "center"
                }}
              >
                {formatBytes(
                  item.originalSize
                )}
              </td>

              <td
                style={{
                  padding: "12px",
                  textAlign: "center"
                }}
              >
                {formatBytes(
                  item.compressedSize
                )}
              </td>

              <td
                style={{
                  padding: "12px",
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                {item.savedPercentage}%
              </td>

              <td
                style={{
                  padding: "12px",
                  textAlign: "center"
                }}
              >
                {formatDate(
                  item.uploadedAt
                )}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "center"
                }}
              >
                {item.compressedUrl ? (
                  <a
                    href={item.compressedUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    🔗 Open
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td
                style={{
                  padding: "12px",
                  textAlign: "center"
                }}
              >
                {item.processedUrl ? (
                  <a
                    href={item.processedUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    🔗 Open
                  </a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;