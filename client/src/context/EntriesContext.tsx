import React, { createContext, useState, useEffect } from 'react';

export interface Entry {
	_id: string;
	userId: string;
	photoUri: string;
	location: { lat: number; lng: number };
	timestamp: number;
}

export interface NewEntryPayload {
	file: File;
	location: { lat: number; lng: number };
}

interface EntriesContextType {
	entries: Entry[];
	addEntry: (payload: NewEntryPayload) => Promise<void>;
	deleteEntry: (id: string) => Promise<void>;
}

export const EntriesContext = createContext<EntriesContextType>({
	entries: [],
	addEntry: async () => {},
	deleteEntry: async () => {}
});

const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('tt_token');

export const EntriesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const [entries, setEntries] = useState<Entry[]>([]);

	useEffect(() => {
		fetch(`${API_URL}/entries`, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(res => res.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setEntries(data);
				} else {
					console.error('Expected array but got:', data);
					setEntries([]);
				}
			})
			.catch(err => {
				console.error(err);
				setEntries([]);
			});
	}, []);

	const addEntry = async ({ file, location }: NewEntryPayload) => {
		const form = new FormData();
		form.append('photo', file);
		form.append('lat', String(location.lat));
		form.append('lng', String(location.lng));

		const res = await fetch(`${API_URL}/entries`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
			body: form
		});
		if (!res.ok) throw new Error(res.statusText);
		const saved: Entry = await res.json();
		setEntries(prev => [saved, ...prev]);
	};

	const deleteEntry = async (id: string) => {
		const res = await fetch(`${API_URL}/entries/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` }
		});
		if (res.ok) {
			setEntries(prev => prev.filter(e => e._id !== id));
		} else {
			console.error('Delete failed', await res.json());
		}
	};

	return (
		<EntriesContext.Provider value={{ entries, addEntry, deleteEntry }}>
			{children}
		</EntriesContext.Provider>
	);
};