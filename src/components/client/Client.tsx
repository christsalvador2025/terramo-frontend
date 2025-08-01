"use client";

import { useGetAllClientsQuery } from "@/lib/redux/features/clients/_clientApiSlice";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { ClientState } from "@/types";

import Spinner from "../shared/Spinner";
import Link from "next/link";
import { Button } from "../ui/button";

import { formatDistanceToNow, parseISO } from "date-fns";
import { EyeIcon, MessageSquareQuoteIcon } from "lucide-react";


export default function Client() {
	// const page = useAppSelector((state: ClientState) => state.client.page);
	// const page = useAppSelector((state: ClientState) => state.client.page)
	const { data, isLoading, error } = useGetAllClientsQuery();
	
	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}
	if(error ){
		return (
			<div className="flex-center pt-32">
				Error getting clients.
			</div>
		);
	}

	console.log('data clients=>',data?.results)
	return (
		<>
			<div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
				Clients OK
				{data?.results?.map((client) => (
					<p key={client.id} >
						{`${client.id}-${client.company_name}` }
					</p>
					))}
			</div>

	
		</>
	);
}
