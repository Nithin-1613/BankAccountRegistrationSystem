import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './dashboard.css'
const Dashboard = ({ props }) => {
    const [account, setAccount] = useState({
        accountNumber: "",
        accountType: "",
        accountBalance: "",
    });

    const { emailid } = useParams();
    useEffect(() => {
        loadUser();

    }, [emailid]);
    const loadUser = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/bank?emailid=${emailid}`);
            if (res.data.length > 0) {
                // Map only the fields you need to the account state
                const userData = res.data[0];
                setAccount({
                  accountNumber: userData.AccountNumber || "",
                  accountType: userData.Accounttype || "",
                  accountBalance: userData.Accountbalance || "0",
                });
                console.log(userData);
              } else {
                // Handle the case where no data was found for the given emailid
                console.log(`No data found for emailid: ${emailid}`);
              }
        } catch (error) {
            if (error.response.status === 404) {
                // Handle 404 error (e.g., show a message)
            } else {
                // Handle other errors
                console.error("Error fetching data:", error);
            }
        }
    }
    return (
        <div className='dash'>
            <Navbar />
            <div className="container">

                <div className='row '>
                    <div id="formcontent" className='col-md-6 offset-md-3  border rounded p-4  '>
                        <h2 className="text-center text-primary"> Account details</h2>
                        <div className='card'>
                            <div className='card-header'>
                                <b>Details of the account of user with emailid:</b>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><b>Account Number:  </b>{account.accountNumber}</li>
                                <li className="list-group-item"><b>Account type:  </b>{account.accountType}</li>
                                <li className="list-group-item"><b>Account balance:  </b>{account.accountBalance}</li>
                            </ul>

                        </div>
                        <Link className='btn btn-primary my-2' to={"/"}>back to home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;