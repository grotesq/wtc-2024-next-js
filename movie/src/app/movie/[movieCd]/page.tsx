import { Metadata } from "next";

export const metadata: Metadata = {
    title: '영화 상세 정보: 영화 위키',
    description: '일별 박스 오피스를 확인하고 영화 정보와 영화인 정보를 조회할 수 있습니다',
    openGraph: {
        title: '영화 상세 정보: 영화 위키',
        description: '일별 박스 오피스를 확인하고 영화 정보와 영화인 정보를 조회할 수 있습니다',
    }
}

type Props = {
    params: {
        movieCd: string;
    }
}

export default async function Page({params: {movieCd}}:Props) {
    const key = '3801c7437930ca3e5a37fd86b59383ea';
    const baseUrl = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json';
    const url = `${baseUrl}?key=${key}&movieCd=${movieCd}`;
    const response = await fetch( url );
    const json: ResponseType = await response.json();
    return <>
        <ul className="w-[500px] mx-auto">
            <li>영화명 : {json.movieInfoResult.movieInfo.movieNm}</li>
            <li>상영시간 : {json.movieInfoResult.movieInfo.showTm}분</li>
            <li>출연 : 
                {json.movieInfoResult.movieInfo.actors.map( actor => (
                    <span className="inline-block mr-2" key={actor.peopleNm}>{actor.peopleNm}</span>
                ))}
            </li>
            <li>감독 :
                {json.movieInfoResult.movieInfo.directors.map(directors => (
                    <span className="inline-block mr-2" key={directors.peopleNm}>{directors.peopleNm}</span>
                ))}
            </li>
        </ul>
    
        {/* <pre><code>{JSON.stringify(json, null, 2)}</code></pre> */}
    </>
}

type ResponseType = {
    movieInfoResult: {
        movieInfo: {
            movieCd: string,
            movieNm: string,
            movieNmEn: string,
            movieNmOg: string,
            showTm: string,
            prdtYear: string,
            openDt: string,
            prdtStatNm: string,
            typeNm: string,
            nations: NationType[],
            genres: ({ genreNm: string })[],
            directors: ({
                "peopleNm": string,
                "peopleNmEn": string,
            })[],
            actors: ({
                "peopleNm": string,
                "peopleNmEn": string,
                "cast": string,
                "castEn": string,
            })[],
            showTypes: ({
                "showTypeGroupNm": string,
                "showTypeNm": string,
            })[],
            companys: ({
                "companyCd": string,
                "companyNm": string,
                "companyNmEn": string,
                "companyPartNm": string,
            })[],
            audits: ({
                "auditNo": string,
                "watchGradeNm": string
            })[],
            staffs: ({
                "peopleNm": string,
                "peopleNmEn": string,
                "staffRoleNm": string,
            })[]
        },
    }
}

type NationType = {
    nationNm: string;
}