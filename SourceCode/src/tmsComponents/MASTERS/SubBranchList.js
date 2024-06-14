import React, { useState, useEffect ,useContext} from 'react';
import Select from 'react-select';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Pagination from '@mui/material/Pagination';
import { TableBody, TableCell, TableRow, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import './MasterStyles.css';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';
import { useToast } from '../../Toast/toast';
import useStyles from '../../centralized_Components/arrowStyle';
import useValidations from '../../centralized_Components/Validations';
import UserContext from '../../Context/UserContext';


const AddSubBranchList = () => {
    const classes = useStyles();
    const { userDetails, login, logout } = useContext(UserContext);
    const { showToast } = useToast();
    const [selectedSubBranch, setSelectedSubBranch] = useState({
        subBranchname: '',
        subBranchaddress: '',
        reportingbranch: '',
        inchargeEmail: '',
        inchargeContactNumber: '',
        groupEmailId: '',
    });
    const [validated, setValidated] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [perPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [show, setShow] = useState(false);
    const [formMode, setFormMode] = useState('add');
    const { mobileError, nameError, emailError, validateEmail, validateName, validateMobile } = useValidations();

    const fetchData = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'branches');
            const result = await response.json();
            setSearchOptions(result.map(product => ({ value: product.branchid, label: product.branchname })));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if(userDetails && userDetails.branchid){
            setSearchInput(userDetails.branchid);
            

        }
        fetchData();

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = API_ENDPOINTS.FETCH_DATA + 'SubBranches';
                if (searchInput) {
                    url += `/${searchInput}`;
                }else if(userDetails.branchid){
                    url += `/${userDetails.branchid}`;
                }
                const response = await fetch(url);
                const result = await response.json();
                setProducts(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [searchInput]);

    const handlePageChange = (selectedPage) => {
        const pageNumber = parseInt(selectedPage.target.textContent, 10) - 1;
        if (!isNaN(pageNumber)) {
            setCurrentPage(pageNumber);
        } else {
            console.error("Invalid page number:", selectedPage.target.textContent);
        }
    };

    const paginatedData = products.slice(currentPage * perPage, (currentPage + 1) * perPage);

    const handleSearchChange = (selectedOption) => {
        if (selectedOption !== null && selectedOption !== undefined) {
            setSearchInput(selectedOption.value);
            setCurrentPage(0);
        } else {
            setSearchInput('');
        }
    };

    const handleShow = (mode, product) => {
        setShow(true);
        setFormMode(mode);
        if (mode === 'edit') {
            setSelectedSubBranch({...product,
                subBranchname: product.subBranchname || '',
                subBranchaddress:product.subBranchaddress ||'',
                reportingbranch:product.reportingbranch || '',
                inchargeContactNumber:product.inchargeContactNumber || '',
                inchargeEmail:product.inchargeEmail || '',
                groupEmailId:product.groupEmailId || '',

        });
        } else {
            setSelectedSubBranch({
                subBranchname: '',
                subBranchaddress: '',
                reportingbranch: '',
                inchargeEmail: '',
                inchargeContactNumber: '',
                groupEmailId: '',
            });
        }
    };

    const handleClose = () => {
        setShow(false);
        setValidated(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'subBranchname':
                validateName(value);
                break;
            case 'inchargeEmail':
                validateEmail(value);
                break;
            case 'inchargeContactNumber':
                validateMobile(value);
                break;
            default:
                break;
        }
        setSelectedSubBranch(prevSelectedSubBranch => ({ ...prevSelectedSubBranch, [name]: value }));
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        let valid = true;

        const isEmailValid = validateEmail(selectedSubBranch.inchargeEmail);
        const isMobileValid = validateMobile(selectedSubBranch.inchargeContactNumber);
        const isNameValid = validateName(selectedSubBranch.subBranchname);

        for (const [fieldName, fieldValue] of Object.entries(selectedSubBranch)) {
            if (typeof fieldValue === 'string' || fieldValue === null) {
                if (fieldValue !== null && fieldValue.trim() === '') {
                    valid = false;
                    break;
                }  else {
                    // If fieldValue is neither a string nor null
                   
                }
        }
    }

        valid = valid && isEmailValid && isNameValid && isMobileValid;

        if (!valid) {
            setValidated(true);
            return;
        }

        setValidated(false);

        try {
            let url = API_ENDPOINTS.FETCH_DATA + 'SubBranches/create';
            let method = 'POST';

           
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedSubBranch),
            });

            if (!response.ok) {
                throw new Error('Failed to save changes');
            }

            handleClose();

            if (formMode === 'add') {
                showToast("Sub Branch Created Successfully", "success");
                const createdSubBranch = await response.json();
                setProducts([...products, createdSubBranch]);
            } else {
                showToast("Sub Branch Updated Successfully", "success");
                fetchData();
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    return (
        <div className="body">
            <h2>Sub Branch List</h2>
            <p><b>Select Branch</b></p>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Select
                        value={searchInput ? searchOptions.find(option => option.value === searchInput) || null : null}
                        onChange={handleSearchChange}
                        options={searchOptions}
                        placeholder="Search branch..."
                        isClearable={true}
                        className='form-select'
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="warning" onClick={() => handleShow('add', null)}>ADD NEW SUB BRANCH</Button>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>SUB BRANCH NAME</b></TableCell>
                            <TableCell><b>ADDRESS</b></TableCell>
                            <TableCell><b>REPORTING BRANCH</b></TableCell>
                            <TableCell><b>ACTION</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell>Loading...</TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>{product.subBranchname}</TableCell>
                                    <TableCell>{product.subBranchaddress}</TableCell>
                                    <TableCell>{product.reportingbranch}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleShow('edit', product)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {products.length > 0 ? (
                <Pagination count={Math.ceil(products.length / perPage)} page={currentPage + 1} onChange={handlePageChange} color="primary" />
            ) : (
                <p>No data available</p>
            )}
            <Modal
                open={show}
                onClose={handleClose}
                BackdropProps={{
                    onClick: (event) => {
                        event.stopPropagation();
                    },
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div style={{ position: 'relative', backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '80%', maxHeight: '80%', overflow: 'auto', marginTop: '40px' }}>
                    <IconButton
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            color: 'red',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <h2>{formMode === 'add' ? 'Add Sub Branch Master' : 'Edit Sub Branch Master'}</h2>
                    <form noValidate onSubmit={handleSaveChanges}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField variant="standard" label="Sub Branch Name" name='subBranchname' fullWidth value={selectedSubBranch.subBranchname || ''} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && (selectedSubBranch.subBranchname === '' || !!nameError)} helperText={validated && selectedSubBranch.subBranchname === '' ? 'Please Enter Sub Branch Name.' : nameError} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField variant="standard" label="Address" name='subBranchaddress' fullWidth value={selectedSubBranch.subBranchaddress || ''} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && selectedSubBranch.subBranchaddress === ''} helperText={validated && selectedSubBranch.subBranchaddress === '' ? 'Please Enter Sub Branch Address.' : ''} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField variant="standard" type="number" className={classes.noArrows} label="Reporting Branch" name='reportingbranch' fullWidth value={selectedSubBranch.reportingbranch || ''} onChange={handleInputChange} size='small' required error={validated && selectedSubBranch.reportingbranch === ''} helperText={validated && selectedSubBranch.reportingbranch === '' ? 'Please Enter Reporting Branch Number.' : ''} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField variant="standard" label="Incharge Email" name='inchargeEmail' fullWidth value={selectedSubBranch.inchargeEmail || ''} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && (selectedSubBranch.inchargeEmail === '' || !!emailError)} helperText={validated && selectedSubBranch.inchargeEmail === '' ? 'Please Enter Incharge Emails.' : emailError} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField variant="standard" label="Incharge Contact" name='inchargeContactNumber' fullWidth value={selectedSubBranch.inchargeContactNumber || ''} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && (selectedSubBranch.inchargeContactNumber === '' || !!mobileError)} helperText={validated && selectedSubBranch.inchargeContactNumber === '' ? 'Please Enter Incharge Contact Number.' : mobileError} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField variant="standard" label="Group Email ID" name='groupEmailId' fullWidth value={selectedSubBranch.groupEmailId || ''} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && selectedSubBranch.groupEmailId === ''} helperText={validated && selectedSubBranch.groupEmailId === '' ? 'Please Enter Group Email Id.' : ''} />
                            </Grid>
                        </Grid>
                        <Button variant="contained" type="submit" className='modal-botton'>{formMode === 'add' ? 'Submit' : 'Update'}</Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AddSubBranchList;
