interface DataGridProps<T> {
    // Do NOT use any
    items: T[];
}

interface Item {
    id: number;
}

export default function DataGrid<T extends Item>({ items }: DataGridProps<T>) {
    return (
        <>
            <ul>
                {items.map((item) => (
                <li key={item.id}>{JSON.stringify(item)}</li>
                ))}
            </ul>
        </>
    );
}