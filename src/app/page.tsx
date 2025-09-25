'use client'
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Page() {

    const [photos, setPhotos] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const tableContainerRef = useRef<HTMLDivElement>(null)

    const fetchData = async (page: number) => {
        setLoading(true)
        const response = await fetch(`/api/photo?page=${page}`)
        const data = await response.json()
        setPhotos((prev: string[]) => [...prev, ...data.photos])
        setLoading(false)
    }

    const handleScroll = () => {
        if (loading) return
        const container = tableContainerRef.current
        if (!container) return
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            fetchData(page + 1)
            setPage((prev: number) => prev + 1)
        }
    }

    useEffect(() => {
        fetchData(page)
    }, [])

    return (
        <motion.div ref={tableContainerRef} onScroll={handleScroll}
            className="flex flex-col items-center bg-white text-black overflow-y-auto max-h-screen">
            <div className="grid grid-cols-5 gap-4 p-4">
                {photos.map((photo, idx) => (
                    <div key={idx}>
                        <Image src={photo.photo} alt={`photo-${idx}`} width={500} height={500} />
                        <p className="text-center text-2xl font-bold">{photo.name}</p>
                    </div>
                ))}
            </div>
            {loading && <div className="flex justify-center items-center h-screen" > <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" /> </div>}
        </motion.div>
    );
}
