export default function SingleBook({title, isbn, author, pages, language}) {
    return (
        <div className={'border border-1 rounded-lg px-4 py-2 gap-y-2 bg-yellow-50'}>
            <div className={'px-4 sm:px-0'}>
                <h3 className="font-semibold text-gray-500">{title}</h3>
                <p className={'mt-1 max-w-2xl  text-gray-400'}>{isbn}</p>
            </div>
            <div className="mt-6 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className=" font-medium text-gray-500">Author</dt>
                        <dd className="mt-1  text-gray-400 sm:col-span-2 sm:mt-0">{author}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className=" font-medium text-gray-500">Pages</dt>
                        <dd className="mt-1  text-gray-400 sm:col-span-2 sm:mt-0">{pages}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="font-medium text-gray-500">Language</dt>
                        <dd className="mt-1  text-gray-400 sm:col-span-2 sm:mt-0">{language}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}