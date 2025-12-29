import React, { useEffect, useState } from 'react';
import lottery from '../../assets/image/lottery.png';
// import gift from '../../assets//image/gift.gif'
import LotteryModal from '../../components/admin/LotteryModal';
import { useLocation } from 'react-router-dom';
import { fetchPostData } from '../../components/hooks/Api';

const LotteryPage = () => {

    const [time, setTime] = useState(15);
    const [openModal, setOpenModal] = useState(false);

    const useQuery = () => {
        const params = new URLSearchParams(useLocation().search);
        return {
            get: (param) => params.get(param)
        };
    };

    const query = useQuery();
    var Category = query?.get("Category");
    var PolicyName = query?.get("PolicyName");

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const CompanyID = localStorage.getItem("companyID") ?? 1;

    useEffect(() => {
        if (time === 0) return;

        const timer = setTimeout(() => {
            setTime(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [time]);


    const fetchApplications = async () => {
        try {
            setLoading(true);

            const response = await fetchPostData("PlotLottery/RunPlotLottery", {
                CompanyID: CompanyID,
                // plot range
                PlotRange: Category,
                // project Name
                PolicyName: PolicyName,
            });

            console.log("response:", response);

            setApplications(response);

        } catch (error) {
            showError("Failed to fetch applications");
            // console.error("Error fetching applications:", error);
            setApplications([]);

        } finally {
            setLoading(false);

        }
    };

    return (
        <div style={styles.wrapper}>
            <img
                src={lottery}
                alt="Lottery"
                style={styles.image}
            />

            <div style={styles.overlay}>
                <div style={styles.title}>
                    Click LOTTERY To See Your Number
                </div>

                <div style={styles.wait}>
                    Wait Until
                </div>

                <div style={styles.age}>
                    {time}
                </div>

                {/* LOTTERY BUTTON */}
                {
                    time === 0 &&
                    <button
                        style={styles.button}
                        onClick={() => {
                            fetchApplications()
                            setOpenModal(true);
                        }}
                    >
                        LOTTERY
                    </button>
                }

                {/* <button
                    style={styles.button}
                    onClick={() => setOpenModal(true)}
                >
                    LOTTERY
                </button> */}

                {/* MODAL */}
                {openModal && (
                    <LotteryModal
                        onClose={() => setOpenModal(false)}
                        applications={applications}
                        loading={loading}
                    />
                )}
            </div>

        </div>
    );
};

const styles = {
    wrapper: {
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'bottom',
        display: 'block',
    },

    overlay: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.25)',

    },

    title: {
        fontSize: '34px',
        fontWeight: '800',
        color: '#FFD700',
        textShadow: '0 0 10px #000, 0 0 20px #ffb300',
        marginBottom: '8px',
    },

    wait: {
        fontSize: '20px',
        color: '#fff',
        fontWeight: '600',
        marginBottom: '4px',
        textShadow: '0 0 6px #000',
    },

    age: {
        fontSize: '40px',
        fontWeight: '900',
        color: '#FFD700',
        marginBottom: '18px',
        textShadow: '0 0 10px #ffcc00',
    },

    button: {
        padding: '10px 36px',
        fontSize: '18px',
        fontWeight: '800',
        color: '#fff',
        background: 'linear-gradient(to bottom, #ff3b3b, #b30000)',
        border: '2px solid #ffcc00',
        borderRadius: '6px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
        textTransform: 'uppercase',
    },
};

export default LotteryPage;
