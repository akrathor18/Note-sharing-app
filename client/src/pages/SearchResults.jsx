import { useState, useEffect } from 'react';
import { FileText, BrainCircuit, Search, Filter, Download, ChevronRight } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatDate } from '../utils/formatDate';
import { SearchResultsSkeleton } from '../common/components/SearchResultsSkeleton';
import NoteCard from '../components/notes/NoteCard';
import API from '../config/axios';
import QuizCard from '../components/quiz/QuizCard';

export default function SearchResults() {

    const navigate = useNavigate();

    const [results, setSearchResults] = useState({ notes: [], quizzes: [], query: '' });
    const [activeTab, setActiveTab] = useState('all');
    const [sortBy, setSortBy] = useState('relevance');
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('query') || '';

    useEffect(() => {
    const query = searchQuery.toLowerCase();

    const fetchResults = async () => {
        try {
            setTimeout(() => setIsLoading(false), 200);

            const [notesResponse, quizzesResponse] = await Promise.all([
                API.get(`/notes/search?query=${query}`),
                API.get(`/quiz/search?query=${query}`)
            ]);

            setSearchResults({
                notes: notesResponse.data,
                quizzes: quizzesResponse.data,
                query
            });
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                'An error occurred while fetching search results.'
            );
        } finally {
            setIsLoading(false); 
        }
    };

    if (query) fetchResults();
}, [searchQuery]);



    
    if(isLoading){
        return <SearchResultsSkeleton/>
    }

    const filteredResults =
        activeTab === 'all'
            ? { notes: results.notes, quizzes: results.quizzes }
            : activeTab === 'notes'
                ? { notes: results.notes, quizzes: [] }
                : { notes: [], quizzes: results.quizzes };

    const sortResults = (items) => {
        if (sortBy === 'newest') {
            return [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'oldest') {
            return [...items].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
        return items;
    };

    const sortedResults = {
        notes: sortResults(filteredResults.notes),
        quizzes: sortResults(filteredResults.quizzes),
    };

    const totalResults = (results?.notes?.length || 0) + (results?.quizzes?.length || 0);
    const totalFilteredResults =
        (sortedResults?.notes?.length || 0) + (sortedResults?.quizzes?.length || 0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-1">Search Results</h1>
                <p className="text-[#F5F5F5]/60">
                    Found {totalResults} results for "{results.query}"
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex overflow-x-auto hide-scrollbar">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeTab === 'all'
                                ? 'bg-[#FF007F] text-white'
                                : 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 text-[#F5F5F5]'
                                }`}
                        >
                            All Results ({totalResults})
                        </button>
                        <button
                            onClick={() => setActiveTab('notes')}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeTab === 'notes'
                                ? 'bg-[#FF007F] text-white'
                                : 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 text-[#F5F5F5]'
                                }`}
                        >
                            Notes ({results.notes.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('quizzes')}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeTab === 'quizzes'
                                ? 'bg-[#FF007F] text-white'
                                : 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 text-[#F5F5F5]'
                                }`}
                        >
                            Quizzes ({results.quizzes.length})
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#F5F5F5]/10 rounded-lg px-3 w-full sm:w-auto">
                    <Filter size={18} className="text-[#F5F5F5]/40" />
                    <select
                        className="bg-[#1A1A1A] py-2 focus:outline-none w-full"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="relevance">Sort by: Relevance</option>
                        <option value="newest">Sort by: Newest</option>
                        <option value="oldest">Sort by: Oldest</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
                {/* Notes Results */}
                {(activeTab === 'all' || activeTab === 'notes') &&
                    sortedResults.notes.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-bold">Notes</h2>
                                {activeTab === 'all' && sortedResults.notes.length > 3 && (
                                    <button onClick={() => setActiveTab('notes')}
                                        className="text-[#00E5FF] text-sm flex items-center hover:underline">
                                        View All <ChevronRight size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {(activeTab === 'all'
                                    ? sortedResults.notes.slice(0, 3)
                                    : sortedResults.notes
                                ).map((note) => (
                                    <NoteCard key={note._id} note={note} />
                                ))}
                            </div>
                        </div>
                    )}

                {/* Quizzes Results */}
                {(activeTab === 'all' || activeTab === 'quizzes') &&
                    sortedResults.quizzes.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-bold">Quizzes</h2>
                                {activeTab === 'all' && sortedResults.quizzes.length > 3 && (
                                    <button onClick={() => setActiveTab('quizzes')}
                                        className="text-[#00E5FF] text-sm flex items-center hover:underline">
                                        View All <ChevronRight size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {(activeTab === 'all'
                                    ? sortedResults.quizzes.slice(0, 3)
                                    : sortedResults.quizzes
                                ).map((quiz) => (
                                    <QuizCard key={quiz._id} quizData={quiz} />
                                ))}
                            </div>
                        </div>
                    )}

                {/* No Results */}
                {totalFilteredResults === 0 && (
                    <div className="text-center py-12">
                        <Search className="mx-auto mb-4 text-[#F5F5F5]/40" size={48} />
                        <h3 className="text-lg font-medium mb-2">No results found</h3>
                        <p className="text-[#F5F5F5]/60">
                            We couldn't find any matches for "{results.query}"
                        </p>
                        <p className="text-[#F5F5F5]/60 mt-1">
                            Try different keywords or check your spelling
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
