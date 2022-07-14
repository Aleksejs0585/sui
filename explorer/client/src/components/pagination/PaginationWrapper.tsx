// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { useState, useCallback } from 'react';

import styles from './PaginationWrapper.module.css';

export default function PaginationWrapper({
    results,
    viewComponentFn,
}: {
    results: any;
    viewComponentFn: Function;
}) {
    const [pageIndex, setPageIndex] = useState(0);

    const ITEMS_PER_PAGE = 6;

    const FINAL_PAGE_NO =
        Math.floor(results.length / ITEMS_PER_PAGE) +
        (results.length % ITEMS_PER_PAGE !== 0 ? 1 : 0);

    const objectSample = results.slice(
        pageIndex * ITEMS_PER_PAGE,
        (pageIndex + 1) * ITEMS_PER_PAGE
    );

    const handleBtnClick = useCallback(
        (pageIndex: number) => () => setPageIndex(pageIndex),
        []
    );

    const handleBackClick = useCallback(
        () => pageIndex - 1 >= 0 && setPageIndex(pageIndex - 1),
        [pageIndex]
    );

    const handleNextClick = useCallback(
        () =>
            (pageIndex + 1) * ITEMS_PER_PAGE < results.length &&
            setPageIndex(pageIndex + 1),
        [pageIndex, results.length]
    );

    // When Total Number of Pages at most 5, list all always:

    //if ((FINAL_PAGE_NO > 1) && (FINAL_PAGE_NO <= 5))

    const FirstTwoButtons = (
        <span className={pageIndex === 0 ? styles.gone : ''}>
            <button
                className={styles.btncontainer}
                id="backBtn"
                onClick={handleBackClick}
                disabled={pageIndex === 0}
            >
                &larr;
            </button>

            <button
                className={
                    pageIndex === 0 ? styles.pagenumber : styles.btncontainer
                }
                id="firstBtn"
                onClick={handleBtnClick(0)}
                disabled={pageIndex === 0}
            >
                1
            </button>
        </span>
    );

    const LastTwoButtons = (
        <span className={pageIndex === FINAL_PAGE_NO - 1 ? styles.gone : ''}>
            <button
                id="lastBtn"
                disabled={pageIndex === FINAL_PAGE_NO - 1}
                onClick={handleBtnClick(FINAL_PAGE_NO - 1)}
                className={styles.btncontainer}
            >
                {FINAL_PAGE_NO}
            </button>
            <button
                id="nextBtn"
                className={styles.btncontainer}
                disabled={pageIndex === FINAL_PAGE_NO - 1}
                onClick={handleNextClick}
            >
                &rarr;
            </button>
        </span>
    );

    return (
        <>
            {viewComponentFn(objectSample)}
            {FINAL_PAGE_NO > 1 && (
                <>
                    {FirstTwoButtons}

                    {pageIndex > 1 && (
                        <button
                            className={
                                pageIndex === 1
                                    ? styles.pagenumber
                                    : styles.btncontainer
                            }
                            id="secondBtn"
                            onClick={handleBtnClick(1)}
                        >
                            2
                        </button>
                    )}
                    {pageIndex > 2 && (
                        <button className={styles.btncontainer}>...</button>
                    )}

                    <button className={styles.pagenumber}>
                        {pageIndex + 1}
                    </button>

                    {pageIndex < FINAL_PAGE_NO - 3 && (
                        <button className={styles.btncontainer}>...</button>
                    )}

                    {pageIndex < FINAL_PAGE_NO - 2 && (
                        <button
                            className={styles.btncontainer}
                            id="secondLastBtn"
                            onClick={handleBtnClick(FINAL_PAGE_NO - 2)}
                        >
                            {FINAL_PAGE_NO - 1}
                        </button>
                    )}
                    {LastTwoButtons}
                </>
            )}
        </>
    );
}
