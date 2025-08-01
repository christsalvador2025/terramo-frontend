import ProtectedRoute from '@/components/shared/ProtectedRoutes'
import React from 'react'
import Navbar from '@/components/shared/navbar/Navbar'
import Client from '@/components/client/Client';
export default function DashboardPage(){
    return (
        <div>
            
            <h1>Dashboard Page</h1>
            <Client/>
        </div>
    )
}

 
// export default function DashboardPage() {
// 	return (
// 		<ProtectedRoute>
// 			<DashboardPageContent />
// 		</ProtectedRoute>
// 	);
// }