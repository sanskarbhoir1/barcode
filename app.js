// Function to generate a barcode
function generateBarcode() {
    let inputData = document.getElementById("inputData").value;
    if (inputData) {
        JsBarcode("#barcode", inputData, {
            format: "CODE128",  // You can change the barcode format if necessary
            displayValue: true
        });
    } else {
        alert("Please enter some data to generate a barcode.");
    }
}

// Function to print the barcode
function printBarcode() {
    let barcodeContent = document.getElementById("barcodeContainer").innerHTML; // Get the barcode HTML
    let newWindow = window.open("", "_blank"); // Open a new blank window
    newWindow.document.write(`
        <html>
        <head>
            <title>Print Barcode</title>
        </head>
        <body>
            <h3>Generated Barcode</h3>
            <div>${barcodeContent}</div>
            <script>
                window.onload = function() {
                    window.print();
                    window.close();
                };
            </script>
        </body>
        </html>
    `);
    newWindow.document.close(); // Close the document stream
}

// Initialize barcode scanner
function startBarcodeScanner() {
    // Initialize the QuaggaJS barcode scanner
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#barcodeScanner')    // The video element where the camera feed will be shown
        },
        decoder: {
            readers: ["code_128_reader"]   // Choose the barcode format(s) to decode
        }
    }, function(err) {
        if (err) {
            console.log(err);
            alert("Error initializing the barcode scanner.");
            return;
        }
        Quagga.start();
    });

    // Listen for barcode scans
    Quagga.onDetected(function(result) {
        // Compare the scanned barcode data with the input value
        let inputData = document.getElementById("inputData").value;
        let scannedData = result.codeResult.code;

        if (scannedData === inputData) {
            document.getElementById("scanResult").textContent = "The barcode data is correct!";
        } else {
            document.getElementById("scanResult").textContent = "The barcode data is incorrect!";
        }
    });
}

// Start scanning when the page loads
window.onload = function() {
    startBarcodeScanner();
};
