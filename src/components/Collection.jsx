import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import noImage from '../Images/noImage.png'

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader
} from '@mui/material';
import '../App.css';

function Collection() {
    const [collectionData, setcollectionData] = useState(undefined);
    const [loading, setloading] = useState(true);
    const {id} = useParams()

    useEffect(()=>{
        console.log(`Collection with id:${id} fired`);
        async function fetchData(){
            try {
                const {data: collection} = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                setcollectionData(collection);
                setloading(false);
                console.log(collection)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[id])

    if(loading){
        return(
            <div>
                <h2>Loading...</h2>
            </div>
        )
    } else{
        return (
            <Card
            variant='outlined'
            sx={{
                maxWidth: 550,
                height: 'auto',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 5,
                border: '1px solid #1e8678',
                boxShadow:
                '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
            }}
            >
                <CardHeader
                    title={collectionData.title}
                    sx={{
                        borderBottom: '1px solid #1e8678',
                        fontWeight: 'bold'
                    }}
                />
                <CardMedia
                component='img'
                image={
                    collectionData.primaryImage
                    ? collectionData.primaryImage
                    : noImage
                }
                title='show image'/>
                <CardContent>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='span'
                        sx={{
                            borderBottom: '1px solid #1e8678',
                            fontWeight: 'bold'
                        }}>
                        <dl>
                            <p>
                                
                                {/* <div >
                                    <span> Artist Name : </span>
                                    <span>
                                    {collectionData && collectionData.artistDisplayName ? collectionData.artistDisplayName : 'N/A'}
                                    </span>
                                </div> */}
                                <dt className='title'>Artist Name:</dt>
                                {collectionData && collectionData.artistDisplayName ? (
                                    <dd>{collectionData.artistDisplayName}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Artist Bio:</dt>
                                {collectionData && collectionData.artistDisplayBio ? (
                                    <dd>{collectionData.artistDisplayBio}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Artist Gender:</dt>
                                {collectionData && collectionData.artistGender ? (
                                    <dd>{collectionData.artistGender}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                            <dt className='title'>Date:</dt>
                                {collectionData && collectionData.objectBeginDate && collectionData.objectEndDate ? (
                                    <dd>{collectionData.objectBeginDate} - {collectionData.objectEndDate}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Department:</dt>
                                {collectionData && collectionData.department ? (
                                    <dd>{collectionData.department}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Medium:</dt>
                                {collectionData && collectionData.medium ? (
                                    <dd>{collectionData.medium}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Classification:</dt>
                                {collectionData && collectionData.classification ? (
                                    <dd>{collectionData.classification}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Culture:</dt>
                                {collectionData && collectionData.culture ? (
                                    <dd>{collectionData.culture}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Dimensions:</dt>
                                {collectionData && collectionData.dimensions ? (
                                    <dd>{collectionData.dimensions}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Accession Number:</dt>
                                {collectionData && collectionData.accessionNumber ? (
                                    <dd>{collectionData.accessionNumber}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Geography:</dt>
                                {collectionData && collectionData.geographyType ? (
                                    <dd>{collectionData.geographyType}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Credit Line:</dt>
                                {collectionData && collectionData.creditLine ? (
                                    <dd>{collectionData.creditLine}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Constituent Name:</dt>
                                {collectionData.constituents && collectionData.constituents[0] && collectionData.constituents[0].name ? (
                                    <dd>{collectionData.constituents[0].name}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Repository:</dt>
                                {collectionData && collectionData.repository ? (
                                    <dd>{collectionData.repository}</dd>
                                ):(
                                    <dd>N/A</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Location:</dt>
                                <dd>{collectionData.city || collectionData.state || collectionData.country ? (
                                    <>
                                        {collectionData.city && <span>{collectionData.city}</span>}
                                        {collectionData.city && collectionData.state && <span>, </span>}
                                        {collectionData.state && <span>{collectionData.state}</span>}
                                        {(collectionData.city || collectionData.state) && collectionData.country && <span>, </span>}
                                        {collectionData.country && <span>{collectionData.country}</span>}
                                    </>
                                ):(
                                    'N/A'
                                )}
                                </dd>
                            </p>                            
                        </dl>
                        <Link to='/collection/page/1'>Back to all Shows</Link>
                    </Typography>
                </CardContent>
            </Card>
        )   
        }
}

export default Collection
