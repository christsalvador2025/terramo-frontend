"use client"
import { useGetClientByIdQuery} from "@/lib/redux/features/clients/clientApiSlice"
import Spinner from "@/components/shared/Spinner";
interface ParamsProps {
	params: {
		id: string;
	};
}
export default function ClientDetailPage({ params }: ParamsProps) {
const id = params.id;
    const { data, isLoading, error } = useGetClientByIdQuery(`${id}`);
    
    if (isLoading) {
        return (
            <div className="flex-center pt-32">
                <Spinner size="xl" />
            </div>
        );
    }
    console.log('data->', data)
    if (error) return <div>Error loading client</div>;
  return (
    <div>ClientDetailPage {id}</div>
  )
}





