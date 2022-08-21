import React, { useState } from "react";
import Papa from "papaparse";
import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '../config/init-firebase'

 
// Allowed extensions for input file
const allowedExtensions = ["csv"];
 
const ReadRecords = () => {
     
    // This state will store the parsed data
    const [data, setData] = useState([]);
     
    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");
     
    // It will store the file uploaded by the user
    const [file, setFile] = useState("");
 
    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
        setError("");
         
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
             
            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }
 
            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    const handleParse = () => {
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");
 
        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();
         
        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            parsedData.forEach((element, index) => {
                let month = 0
                let fecha = ""
                if (element.FECHA !== "") {
                    let dateSplited = element.FECHA.split("-")
                    switch(dateSplited[1]) {
                        case "dic": month = "12"; break;
                        case "ene": month = "01"; break;
                        case "feb": month = "02"; break;
                        case "mar": month = "03"; break;
                        case "abr": month = "04"; break;
                        case "may": month = "05"; break;
                        case "jun": month = "06"; break;
                        case "jul": month = "07"; break;
                        case "ago": month = "08"; break;
                    }
                    console.log(dateSplited[0])
                    fecha = `20${dateSplited[2]}-${month}-${dateSplited[0] >= 10 ? Number(dateSplited[0]) === 31 ? dateSplited[0] : Number(dateSplited[0]) + 1 : dateSplited[0]}`
                }
                console.log(element.FECHA)
                console.log(fecha)
                console.log(new Date(fecha), index+1)
                console.log("---------------------------------")

                const communityMembersCollection = collection(firestore, 'community members')
                addDoc(communityMembersCollection, {
                    name: `${element.NOMBRE} ${element.APELLIDOS}` ,
                    indicative: `+${element.INDICATIVO}`,
                    phone: Number(element.TELEFONO),
                    email: element.CORREO,
                    howYouKnowAsoblockchain: element.REFERIDO,
                    whyDoYouWantBePart: "learn_blockchain_and_cryptocurrencies",
                    hasPaid: false,
                    hash: '',
                    photo: '',
                    address: '',
                    subscription: '',
                    dateInscription: new Date(fecha)
                }).then((response) => {
                    console.log("Record exitoso")
                 }).catch((e) => console.error(e))

            }) 
            const columns = Object.keys(parsedData[0]);

            setData(columns);
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <label htmlFor="csvInput" style={{ display: "block" }}>
                Enter CSV File
            </label>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
            />
            <div>
                <button onClick={handleParse}>Parse</button>
            </div>
            <div style={{ marginTop: "3rem" }}>
                {error ? error : data.map((col,
                  idx) => <div key={idx}>{col}</div>)}
            </div>
        </div>
    );
};
 
export default ReadRecords;