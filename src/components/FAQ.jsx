import React, { useState, useEffect, useCallback } from 'react';
// Assuming the CSS is correctly imported via a module
import styles from '../assets/css/FAQ.module.css'; 
import FAQData from "../data/FAQ.json";
// Removed: import customer_query from '../data/customer_query.json'; // Cannot be written to from the browser

// Import icons from a popular library (React Icons)
import { HiOutlineSearch, HiOutlineX, HiOutlinePaperAirplane } from 'react-icons/hi';
import { FaChevronDown } from 'react-icons/fa';

// Define the common search keywords and their color classes
const commonKeywords = [
    { text: "Project Management", colorClass: styles.keywordColor1 },
    { text: "Design", colorClass: styles.keywordColor2 },
    { text: "Software Development", colorClass: styles.keywordColor3 },
    { text: "DevOps", colorClass: styles.keywordColor4 },
    { text: "Cloud", colorClass: styles.keywordColor5 },
    { text: "Security", colorClass: styles.keywordColor6 },
    { text: "Support", colorClass: styles.keywordColor7 },
    { text: "Pricing", colorClass: styles.keywordColor8 },
];

// This key acts as the file name for your simulated database in the browser.
const CUSTOMER_QUERY_KEY = 'customer_queries_simulated_db';


const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    
    // States for the custom query submission feature
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customQuery, setCustomQuery] = useState('');
    const [userEmail, setUserEmail] = useState(''); 
    const [submitMessage, setSubmitMessage] = useState('');

    useEffect(() => {
        // Controls body overflow when modal is active
        document.body.style.overflow = modalVisible ? 'hidden' : 'unset';
    }, [modalVisible]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeywordClick = (keywordText) => {
        setSearchQuery(keywordText);
    };

    const openModal = (faq) => {
        setSelectedFaq(faq);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => setSelectedFaq(null), 500); 
    };

    /**
     * The core function to "save" the user query and email to Local Storage.
     * This mimics writing to the 'customer_query.json' file.
     */
    const handleSubmitQuery = useCallback(() => {
        if (customQuery.trim() === '' || userEmail.trim() === '') {
            setSubmitMessage('Please enter both your question and a valid email.');
            setTimeout(() => setSubmitMessage(''), 5000);
            return;
        }

        // --- 💾 LOCAL STORAGE (SIMULATED SAVE) 💾 ---
        try {
            // 1. Retrieve the existing array of queries
            const existingQueriesJSON = localStorage.getItem(CUSTOMER_QUERY_KEY);
            let existingQueries = [];
            if (existingQueriesJSON) {
                existingQueries = JSON.parse(existingQueriesJSON);
            }

            // 2. Create the new query object with the required data fields
            const newQuery = {
                id: Date.now(), // Unique ID for tracking
                query: customQuery.trim(),
                email: userEmail.trim(), // The email is saved perfectly
                timestamp: new Date().toISOString()
            };

            // 3. Add the new object and save the entire array back to Local Storage
            existingQueries.push(newQuery);
            localStorage.setItem(CUSTOMER_QUERY_KEY, JSON.stringify(existingQueries));

            console.log("--- Customer Query Saved ---");
            console.log("Saved Object:", newQuery);
            console.log("To view all saved data, check your browser's Application -> Local Storage for the key 'customer_queries_simulated_db'");
            
            setSubmitMessage('Thank you! Your question and email are saved in the browser’s storage (simulated JSON file). 🚀');

        } catch (error) {
            console.error("Error saving to Local Storage:", error);
            setSubmitMessage('Submission failed! Could not access local browser storage.');
        }
        // ------------------------------------

        // Reset form and cleanup
        setCustomQuery(''); 
        setUserEmail('');
        setIsSubmitting(false); 
        
        // Clear the success/error message after a few seconds
        setTimeout(() => setSubmitMessage(''), 8000);
    }, [customQuery, userEmail]);

    // Handle Enter key for submission 
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmitQuery();
        }
    };

    const filteredFaqs = FAQData.reduce((acc, category) => {
        const query = searchQuery.toLowerCase();
        const matchingFaqs = category.faqs.filter(faq =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        );

        if (matchingFaqs.length > 0) {
            acc.push({
                ...category,
                faqs: matchingFaqs
            });
        }
        return acc;
    }, []);

    const renderFaqCategories = () => {
        return (
            <div className={styles.faqListContainer}>
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((category, index) => (
                        <div key={index} className={styles.categoryContainer}>
                            <h2 className={styles.categoryTitle}>{category.category}</h2>
                            <div className={styles.faqList}>
                                {category.faqs.map((faq, faqIndex) => (
                                    <div
                                        key={faqIndex}
                                        className={styles.faqItem}
                                        onClick={() => openModal(faq)}
                                    >
                                        <div className={styles.faqQuestion}>
                                            <p className={styles.questionText}>{faq.question}</p>
                                            <FaChevronDown className={styles.chevronIcon} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noResults}>
                        <p>No questions found. Please try a different search term.</p>
                    </div>
                )}
            </div>
        );
    };

    const renderModal = () => {
        if (!selectedFaq) return null;

        return (
            <div className={`${styles.modalOverlay} ${modalVisible ? styles.modalActive : ''}`} onClick={closeModal}>
                <div 
                    className={`${styles.modalContent} ${modalVisible ? styles.modalActive : ''}`} 
                    onClick={e => e.stopPropagation()} 
                >
                    <div className={styles.modalHeader}>
                        <h3 className={styles.modalQuestion}>{selectedFaq.question}</h3>
                        <button onClick={closeModal} className={styles.closeButton} aria-label="Close">
                            <HiOutlineX className={styles.closeIcon} />
                        </button>
                    </div>
                    <div className={styles.modalBody}>
                        <p className={styles.modalAnswer}>{selectedFaq.answer}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderSubmissionArea = () => {
        return (
            <div className={styles.submissionContainer}>
                <p className={styles.submissionPrompt}>
                    Do you have another question? 
                    <span 
                        className={styles.submitLink} 
                        onClick={() => {
                            setIsSubmitting(true);
                            setSubmitMessage(''); 
                        }}
                        aria-label="Submit a new question"
                    >
                        Don't worry. Submit Here.
                    </span>
                </p>

                {submitMessage && (
                    <p className={styles.submitMessage}>{submitMessage}</p>
                )}

                {isSubmitting && (
                    <div className={styles.submissionForm}>
                        <div className={styles.customQueryInputGroup}>
                            <input
                                type="text"
                                placeholder="Type your question here..."
                                className={styles.customQueryInput}
                                value={customQuery}
                                onChange={(e) => setCustomQuery(e.target.value)}
                            />
                            <button onClick={handleSubmitQuery} className={styles.submitButton} aria-label="Send Query">
                                <HiOutlinePaperAirplane className={styles.sendIcon} />
                            </button>
                        </div>
                        <input
                            type="email"
                            placeholder="Your email address (for reply)..."
                            className={styles.emailInput} 
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={styles.faqSection}>
            <div className={styles.faqContent}>
                <h1 className={styles.mainTitle}>Frequently Asked Questions</h1>
                <p className={styles.subtitle}>
                    Find answers to the most common questions about our software development services and process.
                </p>
                
                {/* Search keywords section */}
                <div className={styles.keywordContainer}>
                    <p className={styles.keywordTitle}>Common Search Terms:</p>
                    <div className={styles.keywordList}>
                        {commonKeywords.map((keyword, index) => (
                            <span 
                                key={index} 
                                className={`${styles.keyword} ${keyword.colorClass}`}
                                onClick={() => handleKeywordClick(keyword.text)}
                            >
                                {keyword.text}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.searchContainer}>
                    <HiOutlineSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search for a question..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Submission Area */}
                {renderSubmissionArea()}
                
                {renderFaqCategories()}
            </div>
            {renderModal()}
        </div>
    );
};

export default FAQ;



