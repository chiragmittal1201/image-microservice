function AnalyticsCards({ history }) {
    const totalUploads = history.length;

    const averageCompression =
        history.length > 0
            ? (
                history.reduce(
                    (sum, item) =>
                        sum + Number(item.savedPercentage),
                    0
                ) / history.length
            ).toFixed(2)
            : 0;

    const totalSaved = history.reduce(
        (sum, item) =>
            sum +
            (item.originalSize -
                item.compressedSize),
        0
    );

    const formatBytes = (bytes) => {
        if (bytes < 1024)
            return `${bytes} B`;

        if (bytes < 1024 * 1024)
            return `${(
                bytes / 1024
            ).toFixed(2)} KB`;

        return `${(
            bytes /
            (1024 * 1024)
        ).toFixed(2)} MB`;
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px"
            }}
        >
            <div
                className="card"
                style={{
                    background:
                        "linear-gradient(135deg,#2563eb,#1d4ed8)",
                    textAlign: "center"
                }}
            >
                <h3>Total Uploads</h3>
                <p>{totalUploads}</p>
            </div>

            <div
                className="card"
                style={{
                    background:
                        "linear-gradient(135deg,#2563eb,#1d4ed8)",
                    textAlign: "center"
                }}
            >
                <h3>Avg Compression</h3>
                <p>{averageCompression}%</p>
            </div>

            <div
                className="card"
                style={{
                    background:
                        "linear-gradient(135deg,#059669,#047857)",
                    textAlign: "center"
                }}
            >
                <h3>Space Saved</h3>
                <p>{formatBytes(totalSaved)}</p>
            </div>
        </div>
    );
}

export default AnalyticsCards;