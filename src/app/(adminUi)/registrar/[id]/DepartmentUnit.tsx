'use client';

import React, { useState } from 'react';
import Department from './Department';
import Unit from './Unit';
import { DepartmentModel } from '@/models/department';
 './AddDepartment';

const DepartmentUnit = ()=>{
 const [selectedDept, setSelectedDepartment ] = useState<DepartmentModel | null>(null);

 const handleOnBack =()=>{
    setSelectedDepartment(null);
 }
 const selectDepartment=(dept?: DepartmentModel)=>{
  setSelectedDepartment(dept || null);
 }
 return(<>
        {!selectedDept ? <Department toggleView={selectDepartment} /> : <Unit onBack={handleOnBack} department={selectedDept || null} />}
        
 </>)
}
export default DepartmentUnit;