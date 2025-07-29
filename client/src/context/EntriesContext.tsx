import React, { createContext, useState, useEffect } from 'react';

export interface Entry {
	id: string;
	photoUri: string;
	location: { lat: number; lng: number };
	timestamp: number;
}

interface EntriesContextType {
	entries: Entry[];
	addEntry: (entry: Omit<Entry, 'id' | 'timestamp'>) => void;
}

export const EntriesContext = createContext<EntriesContextType>({
	entries: [],
	addEntry: () => {}
});

const API_URL = process.env.REACT_APP_API_URL!;

export const EntriesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const [entries, setEntries] = useState<Entry[]>([]);

	// 1) Fetch existing entries from backend
	useEffect(() => {
		fetch(`${API_URL}/entries`)
		.then(res => res.json())
		.then((data: Entry[]) => setEntries(data))
		.catch(console.error);
	}, []);

	// 2) addEntry posts to backend then updates state
	const addEntry = async (e: Omit<Entry, 'id' | 'timestamp'>) => {
		try {
			const res = await fetch(`${API_URL}/entries`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(e)
			});
			const saved: Entry = await res.json();
			setEntries(prev => [saved, ...prev]);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<EntriesContext.Provider value={{ entries, addEntry }}>
			{children}
		</EntriesContext.Provider>
	);
};