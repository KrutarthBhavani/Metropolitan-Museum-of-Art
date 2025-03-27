import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import noImage from "../Images/noImage.png";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@mui/material";

const CollectionList = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [artObjects, setArtObjects] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/departments`);
        setDepartments(response.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = 20; // Adjusted for search results
        const params = {
          pageSize: searchTerm ? pageSize : 50,
          q: searchTerm,
        };
        if (selectedDepartment) {
          params.departmentIds = selectedDepartment;
        }

        const endpoint = searchTerm
          ? `https://collectionapi.metmuseum.org/public/collection/v1/search`
          : `https://collectionapi.metmuseum.org/public/collection/v1/objects`;

        const response = await axios.get(endpoint, { params });
        setTotalPages(Math.ceil(response.data.total / (searchTerm ? pageSize : 50)));
        
        const objectIDs = response.data.objectIDs.slice(
          (pageNumber - 1) * (searchTerm ? pageSize : 50),
          pageNumber * (searchTerm ? pageSize : 50)
        );

        const objectsData = await Promise.all(
          objectIDs.map(async (id) => {
            const objectResponse = await axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            return objectResponse.data;
          })
        );
        setArtObjects(objectsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, selectedDepartment, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/collection/page/1`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  if (error) return <Typography>Error: {error.message}</Typography>;
  if (artObjects.length === 0) return <Typography>No results found</Typography>;

  return (
    <div>
      <Typography variant="h2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>ART COLLECTION</Link>
      </Typography>
      
    
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <br />
      <FormControl fullWidth>
        <InputLabel id="department-select-label">Department</InputLabel>
        <Select
          labelId="department-select-label"
          id="department-select"
          value={selectedDepartment}
          label="Department"
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
             
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {departments.map((department) => (
            <MenuItem key={department.departmentId} value={department.departmentId}>
              {department.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br /><br />
      <Grid container spacing={3}>
        {artObjects.map((artObject) => (
          <Grid item key={artObject.objectID} xs={12} sm={6} md={4}>
            <Link
              to={`/collection/${artObject.objectID}`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                <CardHeader title={artObject.title} />
                <CardMedia
                  component="img"
                  alt={artObject.title}
                  height="140"
                  image={artObject.primaryImage || noImage}
                  sx={{ height: 140, width: '100%', objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="body2">
                    <b>Artist Name :</b> {artObject.artistDisplayName || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <b>Department Name :</b> {artObject.department || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <b>Credit Line :</b> {artObject.creditLine || 'N/A'}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex' }}>
                  <Button
                    component={Link}
                    to={`/collection/${artObject.objectID}`}
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: 'Navy' }}
                  >
                    More Details
                  </Button>
                </CardActions>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {parseInt(page, 10) > 1 && (
          <Button onClick={() => navigate(`/collection/page/${parseInt(page, 10) - 1}`)} variant="outlined" style={{ marginRight: "10px" }}>
            Previous
          </Button>
        )}
        {parseInt(page, 10) < totalPages && (
          <Button onClick={() => navigate(`/collection/page/${parseInt(page, 10) + 1}`)} variant="outlined">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default CollectionList;
