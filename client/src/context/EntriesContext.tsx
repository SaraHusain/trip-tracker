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

const STORAGE_KEY = 'triptracker_entries';

export const EntriesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const [entries, setEntries] = useState<Entry[]>([]);

	// Load from localStorage on mount
	useEffect(() => {
		const data = localStorage.getItem(STORAGE_KEY);
		if (data) setEntries(JSON.parse(data));
	}, []);

	// Persist to localStorage on change
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
	}, [entries]);

	const addEntry = (e: Omit<Entry, 'id' | 'timestamp'>) => {
		const newEntry: Entry = {
			id: Math.random().toString(36).substr(2, 9),
			timestamp: Date.now(),
			...e
		};
		setEntries(prev => [newEntry, ...prev]);
	};

	return (
		<EntriesContext.Provider value={{ entries, addEntry }}>
			{children}
		</EntriesContext.Provider>
	);
};