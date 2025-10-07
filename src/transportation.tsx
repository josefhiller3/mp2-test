import React from 'react';
type TransportationProps = {
    goToNextPage: () => void;
    goToPreviousPage: () => void;
}

export default function Transportation({goToNextPage, goToPreviousPage} : TransportationProps) {
    return (
        <div>
            <button onClick = {goToPreviousPage}>Previous</button>
            <button onClick = {goToNextPage}>Next</button>
        </div>
    );
}   

