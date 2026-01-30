import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Booking() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [bookedMovies, setBookedMovies] = useState([]);

  // Load booked movies from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('bookedMovies');
    if (stored) {
      try {
        setBookedMovies(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading booked movies:', e);
      }
    }
  }, []);

  const movies = [
    {
      id: 1,
      title: 'Pushpa: The Rise',
      genre: 'Action',
      rating: 8.5,
      duration: '3h 12m',
      language: 'Hindi',
      price: 280,
      bannerGradient: 'linear-gradient(135deg, #d4af37 0%, #8b4513 100%)',
      description: 'An action-packed thriller about a smuggler\'s rise in the red sandalwood trade. Starring Allu Arjun.',
      cast: 'Allu Arjun, Rashmika Mandanna',
      showTimes: ['10:30 AM', '2:15 PM', '6:45 PM', '9:30 PM']
    },
    {
      id: 2,
      title: 'Jai Bhim',
      genre: 'Drama',
      rating: 8.8,
      duration: '2h 44m',
      language: 'Hindi',
      price: 220,
      bannerGradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
      description: 'An inspiring drama about a lawyer fighting for justice for the oppressed. Powerful storytelling and performances.',
      cast: 'Suriya, Manikandan',
      showTimes: ['11:00 AM', '3:00 PM', '7:15 PM', '10:00 PM']
    },
    {
      id: 3,
      title: 'Bhool Bhulaiyaa 2',
      genre: 'Comedy',
      rating: 7.8,
      duration: '2h 29m',
      language: 'Hindi',
      price: 250,
      bannerGradient: 'linear-gradient(135deg, #8b0000 0%, #ff69b4 100%)',
      description: 'A hilarious horror-comedy about a haunted mansion. Starring Kartik Aaryan with witty humor throughout.',
      cast: 'Kartik Aaryan, Kiara Advani',
      showTimes: ['9:45 AM', '1:30 PM', '5:00 PM', '8:30 PM']
    },
    {
      id: 4,
      title: 'Pathaan',
      genre: 'Action',
      rating: 8.3,
      duration: '2h 27m',
      language: 'Hindi',
      price: 300,
      bannerGradient: 'linear-gradient(135deg, #1a1a2e 0%, #ff006e 100%)',
      description: 'A high-octane spy thriller featuring Shah Rukh Khan. Intense action sequences and gripping plot.',
      cast: 'Shah Rukh Khan, Deepika Padukone',
      showTimes: ['10:15 AM', '2:45 PM', '6:30 PM', '9:15 PM']
    },
    {
      id: 5,
      title: 'Bhediya',
      genre: 'Action',
      rating: 8.1,
      duration: '2h 25m',
      language: 'Hindi',
      price: 260,
      bannerGradient: 'linear-gradient(135deg, #4a235a 0%, #b39ddb 100%)',
      description: 'A supernatural action film about a man who transforms into a werewolf. Stars Varun Dhawan.',
      cast: 'Varun Dhawan, Kriti Sanon',
      showTimes: ['10:00 AM', '1:45 PM', '5:30 PM', '8:45 PM']
    },
    {
      id: 6,
      title: 'Drishyam 2',
      genre: 'Thriller',
      rating: 8.4,
      duration: '2h 23m',
      language: 'Hindi',
      price: 240,
      bannerGradient: 'linear-gradient(135deg, #1b1b1b 0%, #ffd700 100%)',
      description: 'A gripping thriller sequel where a man protects his family from a murder investigation.',
      cast: 'Ajay Devgn, Tabu',
      showTimes: ['11:30 AM', '3:15 PM', '7:00 PM', '10:15 PM']
    },
    {
      id: 7,
      title: 'Khiladi 1080',
      genre: 'Action',
      rating: 7.9,
      duration: '2h 38m',
      language: 'Hindi',
      price: 270,
      bannerGradient: 'linear-gradient(135deg, #ff4500 0%, #ffa500 100%)',
      description: 'An action thriller with jaw-dropping stunts. Akshay Kumar delivers high-octane entertainment.',
      cast: 'Akshay Kumar, Kriti Sanon',
      showTimes: ['10:00 AM', '2:30 PM', '6:00 PM', '9:00 PM']
    },
    {
      id: 8,
      title: 'Gadar 2',
      genre: 'Action',
      rating: 8.2,
      duration: '2h 48m',
      language: 'Hindi',
      price: 290,
      bannerGradient: 'linear-gradient(135deg, #8b0000 0%, #ff6347 100%)',
      description: 'An epic action drama about love and patriotism. Sunny Deol returns in this blockbuster.',
      cast: 'Sunny Deol, Urvashi Rautela',
      showTimes: ['10:15 AM', '2:45 PM', '6:15 PM', '9:45 PM']
    },
    {
      id: 9,
      title: 'Chhichhore',
      genre: 'Drama',
      rating: 8.0,
      duration: '2h 26m',
      language: 'Hindi',
      price: 220,
      bannerGradient: 'linear-gradient(135deg, #4169e1 0%, #87ceeb 100%)',
      description: 'A heartwarming coming-of-age drama about college life and friendship. Starring Rajkummar Rao.',
      cast: 'Rajkummar Rao, Shraddha Kapoor',
      showTimes: ['11:00 AM', '3:00 PM', '7:00 PM', '10:00 PM']
    },
    {
      id: 10,
      title: 'Badhaai Ho',
      genre: 'Comedy',
      rating: 8.1,
      duration: '2h 5m',
      language: 'Hindi',
      price: 200,
      bannerGradient: 'linear-gradient(135deg, #9932cc 0%, #ff1493 100%)',
      description: 'A hilarious family comedy about accepting unconventional situations. Ayushmann Khurrana shines.',
      cast: 'Ayushmann Khurrana, Neena Gupta',
      showTimes: ['10:30 AM', '2:00 PM', '5:30 PM', '8:00 PM']
    },
    {
      id: 11,
      title: 'Uri: The Surgical Strike',
      genre: 'Action',
      rating: 8.3,
      duration: '2h 12m',
      language: 'Hindi',
      price: 260,
      bannerGradient: 'linear-gradient(135deg, #1a472a 0%, #2e8b57 100%)',
      description: 'A patriotic action thriller about a military surgical strike. Vicky Kaushal delivers a powerful performance.',
      cast: 'Vicky Kaushal, Paresh Rawal',
      showTimes: ['9:30 AM', '1:00 PM', '4:30 PM', '8:00 PM']
    },
    {
      id: 12,
      title: 'Kabir Singh',
      genre: 'Drama',
      rating: 7.8,
      duration: '2h 54m',
      language: 'Hindi',
      price: 270,
      bannerGradient: 'linear-gradient(135deg, #2f4f4f 0%, #dc143c 100%)',
      description: 'An intense romantic drama with complex characters. Shahid Kapoor\'s career-best performance.',
      cast: 'Shahid Kapoor, Kiara Advani',
      showTimes: ['10:30 AM', '2:15 PM', '6:45 PM', '9:30 PM']
    },
    {
      id: 13,
      title: 'Raazi',
      genre: 'Thriller',
      rating: 8.0,
      duration: '2h 18m',
      language: 'Hindi',
      price: 240,
      bannerGradient: 'linear-gradient(135deg, #663399 0%, #ff69b4 100%)',
      description: 'A patriotic thriller about a girl\'s journey as a spy during wartime. Alia Bhatt\'s finest work.',
      cast: 'Alia Bhatt, Vicky Kaushal',
      showTimes: ['10:00 AM', '1:45 PM', '5:30 PM', '8:15 PM']
    },
    {
      id: 14,
      title: 'Laal Singh Chaddha',
      genre: 'Drama',
      rating: 7.9,
      duration: '2h 40m',
      language: 'Hindi',
      price: 300,
      bannerGradient: 'linear-gradient(135deg, #ff8c00 0%, #ffd700 100%)',
      description: 'A modern adaptation of a global classic. Aamir Khan brings warmth and humor to this tale.',
      cast: 'Aamir Khan, Kareena Kapoor',
      showTimes: ['10:30 AM', '2:15 PM', '6:45 PM', '9:30 PM']
    },
    {
      id: 15,
      title: 'Gully Boy',
      genre: 'Drama',
      rating: 8.2,
      duration: '2h 33m',
      language: 'Hindi',
      price: 250,
      bannerGradient: 'linear-gradient(135deg, #330033 0%, #ff3333 100%)',
      description: 'An inspiring drama about a street rapper\'s rise to fame. Ranveer Singh delivers raw performance.',
      cast: 'Ranveer Singh, Alia Bhatt',
      showTimes: ['11:00 AM', '3:00 PM', '7:15 PM', '10:00 PM']
    },
    {
      id: 16,
      title: 'Dangal',
      genre: 'Drama',
      rating: 8.4,
      duration: '2h 41m',
      language: 'Hindi',
      price: 270,
      bannerGradient: 'linear-gradient(135deg, #8b4513 0%, #daa520 100%)',
      description: 'A heartwarming true story of a wrestler\'s daughters. Aamir Khan in an iconic role.',
      cast: 'Aamir Khan, Sakshi Tanwar',
      showTimes: ['10:00 AM', '2:30 PM', '6:00 PM', '9:00 PM']
    },
    {
      id: 17,
      title: 'Padmaavat',
      genre: 'Historical',
      rating: 7.7,
      duration: '2h 34m',
      language: 'Hindi',
      price: 280,
      bannerGradient: 'linear-gradient(135deg, #8b0000 0%, #ffd700 100%)',
      description: 'An epic historical drama with stunning visuals. Deepika Padukone shines in lead role.',
      cast: 'Ranveer Singh, Deepika Padukone, Shahid Kapoor',
      showTimes: ['10:15 AM', '2:45 PM', '6:30 PM', '9:15 PM']
    },
    {
      id: 18,
      title: 'Ek Villain Returns',
      genre: 'Thriller',
      rating: 7.6,
      duration: '2h 14m',
      language: 'Hindi',
      price: 230,
      bannerGradient: 'linear-gradient(135deg, #000000 0%, #8b0000 100%)',
      description: 'A thrilling sequel with plot twists and action. John Abraham and Arjun Kapoor face off.',
      cast: 'John Abraham, Arjun Kapoor',
      showTimes: ['9:30 AM', '1:00 PM', '4:30 PM', '8:00 PM']
    },
    {
      id: 19,
      title: 'Main Hoon Na',
      genre: 'Action',
      rating: 7.5,
      duration: '2h 54m',
      language: 'Hindi',
      price: 210,
      bannerGradient: 'linear-gradient(135deg, #0066cc 0%, #00ccff 100%)',
      description: 'A fun-filled action comedy with romance. Shah Rukh Khan protects his step-sister.',
      cast: 'Shah Rukh Khan, Sushmita Sen',
      showTimes: ['10:00 AM', '2:30 PM', '6:00 PM', '9:00 PM']
    },
    {
      id: 20,
      title: 'Adipurush',
      genre: 'Action',
      rating: 7.4,
      duration: '2h 49m',
      language: 'Hindi',
      price: 300,
      bannerGradient: 'linear-gradient(135deg, #8b4513 0%, #ff8c00 100%)',
      description: 'An epic action-adventure retelling a mythological tale. Prabhas in a grand production.',
      cast: 'Prabhas, Kriti Sanon, Saif Ali Khan',
      showTimes: ['10:30 AM', '2:15 PM', '6:45 PM', '9:30 PM']
    },
    {
      id: 21,
      title: 'Bhaag Milkha Bhaag',
      genre: 'Biography',
      rating: 8.1,
      duration: '2h 51m',
      language: 'Hindi',
      price: 250,
      bannerGradient: 'linear-gradient(135deg, #ffa500 0%, #ff6347 100%)',
      description: 'An inspiring true story of India\'s greatest athlete. Farhan Akhtar\'s career-defining role.',
      cast: 'Farhan Akhtar, Sonam Kapoor',
      showTimes: ['10:00 AM', '1:45 PM', '5:30 PM', '8:15 PM']
    },
    {
      id: 22,
      title: 'Sairat',
      genre: 'Romance',
      rating: 8.3,
      duration: '2h 22m',
      language: 'Marathi',
      price: 200,
      bannerGradient: 'linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)',
      description: 'A blockbuster Marathi romance about young love against social barriers. Critically acclaimed.',
      cast: 'Nagraj Manjule, Rinku Rajguru',
      showTimes: ['10:00 AM', '1:45 PM', '5:30 PM', '8:15 PM']
    },
    {
      id: 23,
      title: 'Natrang',
      genre: 'Drama',
      rating: 8.4,
      duration: '2h 7m',
      language: 'Marathi',
      price: 180,
      bannerGradient: 'linear-gradient(135deg, #8b008b 0%, #ff69b4 100%)',
      description: 'A brilliant drama about a theater performer. Winner of multiple national awards.',
      cast: 'Atul Kulkarni, Medha Manjrekar',
      showTimes: ['11:00 AM', '3:00 PM', '7:15 PM', '10:00 PM']
    },
    {
      id: 24,
      title: 'Mulk',
      genre: 'Drama',
      rating: 8.2,
      duration: '1h 58m',
      language: 'Marathi',
      price: 190,
      bannerGradient: 'linear-gradient(135deg, #2f4f4f 0%, #ff8c00 100%)',
      description: 'A powerful family drama about inheritance and relationships. Emotionally gripping.',
      cast: 'Jyoti Malshe, Sachin Khedekar',
      showTimes: ['10:30 AM', '2:00 PM', '6:00 PM', '9:00 PM']
    },
    {
      id: 25,
      title: 'Jai Bhim Jai Bhim',
      genre: 'Drama',
      rating: 8.0,
      duration: '2h 14m',
      language: 'Marathi',
      price: 170,
      bannerGradient: 'linear-gradient(135deg, #4169e1 0%, #87ceeb 100%)',
      description: 'An inspiring Marathi drama about social justice and equality. Thought-provoking narrative.',
      cast: 'Mahendra Ekbote, Mala Saptale',
      showTimes: ['10:15 AM', '2:45 PM', '6:15 PM', '9:15 PM']
    },
    {
      id: 26,
      title: 'Fandry',
      genre: 'Drama',
      rating: 8.1,
      duration: '1h 46m',
      language: 'Marathi',
      price: 185,
      bannerGradient: 'linear-gradient(135deg, #8b4513 0%, #daa520 100%)',
      description: 'A sensitive drama about caste system and childhood innocence. Award-winning Marathi film.',
      cast: 'Jai Bhim, Manjuta Gali',
      showTimes: ['9:30 AM', '1:00 PM', '4:30 PM', '8:00 PM']
    },
    {
      id: 27,
      title: 'Piku',
      genre: 'Comedy',
      rating: 7.9,
      duration: '2h 2m',
      language: 'Marathi',
      price: 195,
      bannerGradient: 'linear-gradient(135deg, #ffa500 0%, #ff6347 100%)',
      description: 'A hilarious Marathi comedy about family dynamics and relationships. Light-hearted entertainment.',
      cast: 'Medha Manjrekar, Pushkar Shrotri',
      showTimes: ['10:00 AM', '2:30 PM', '6:00 PM', '9:00 PM']
    },
    {
      id: 28,
      title: 'Kaul',
      genre: 'Thriller',
      rating: 7.8,
      duration: '2h 9m',
      language: 'Marathi',
      price: 200,
      bannerGradient: 'linear-gradient(135deg, #000000 0%, #8b0000 100%)',
      description: 'A suspenseful Marathi thriller with unexpected plot twists. Edge-of-the-seat entertainment.',
      cast: 'Arun Gawli, Mahendra Ekbote',
      showTimes: ['10:30 AM', '2:15 PM', '6:45 PM', '9:30 PM']
    },
    {
      id: 29,
      title: 'Jai Maharashtra',
      genre: 'Action',
      rating: 7.7,
      duration: '2h 25m',
      language: 'Marathi',
      price: 210,
      bannerGradient: 'linear-gradient(135deg, #ff4500 0%, #ffa500 100%)',
      description: 'An action-packed patriotic Marathi film celebrating Maharashtra\'s pride and culture.',
      cast: 'Vikram Gokhale, Akshay Deodhar',
      showTimes: ['10:15 AM', '2:45 PM', '6:30 PM', '9:15 PM']
    },
    {
      id: 30,
      title: 'Rang Barse',
      genre: 'Drama',
      rating: 8.0,
      duration: '2h 11m',
      language: 'Marathi',
      price: 190,
      bannerGradient: 'linear-gradient(135deg, #9932cc 0%, #ff1493 100%)',
      description: 'A vibrant Marathi drama capturing rural life and traditions. Culturally rich narrative.',
      cast: 'Ashok Saraf, Savitri Jadhav',
      showTimes: ['11:00 AM', '3:00 PM', '7:00 PM', '10:00 PM']
    },
    {
      id: 31,
      title: 'Natarang',
      genre: 'Historical',
      rating: 8.5,
      duration: '2h 8m',
      language: 'Marathi',
      price: 205,
      bannerGradient: 'linear-gradient(135deg, #8b4513 0%, #d2b48c 100%)',
      description: 'A historical Marathi drama about theater and transformation. Critically acclaimed masterpiece.',
      cast: 'Atul Kulkarni, Medha Manjrekar',
      showTimes: ['10:00 AM', '1:45 PM', '5:30 PM', '8:15 PM']
    }
  ];

  const genres = ['All', 'Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Historical', 'Biography'];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  function handleSelectShowtime(movie, showtime) {
    navigate('/payment', { 
      state: { 
        movie: movie.title,
        movieId: movie.id,
        price: movie.price,
        showtime,
        seats: 1,
        onBookingComplete: (bookingData) => {
          const newBooking = {
            id: Date.now(),
            movie: movie.title,
            movieId: movie.id,
            showtime: showtime,
            seats: bookingData.seats,
            totalPrice: bookingData.totalPrice,
            bookedAt: new Date().toLocaleString()
          };
          const updated = [...bookedMovies, newBooking];
          setBookedMovies(updated);
          localStorage.setItem('bookedMovies', JSON.stringify(updated));
        }
      } 
    });
  }

  return (
    <div className="booking-page fade-in">
      {/* Orders Section */}
      {bookedMovies.length > 0 && (
        <div className="orders-section">
          <h2 style={{marginBottom: 20}}>📋 Your Bookings</h2>
          <div className="orders-grid">
            {bookedMovies.map((booking, index) => (
              <div key={booking.id} className="order-card slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="order-header">
                  <div className="order-status">✓ Confirmed</div>
                  <div className="order-id">#{booking.id.toString().slice(-6)}</div>
                </div>
                
                <div className="order-details">
                  <div className="order-item">
                    <span className="order-label">🎬 Movie</span>
                    <span className="order-value">{booking.movie}</span>
                  </div>
                  
                  <div className="order-item">
                    <span className="order-label">🕐 Showtime</span>
                    <span className="order-value">{booking.showtime}</span>
                  </div>
                  
                  <div className="order-item">
                    <span className="order-label">🎫 Seats</span>
                    <span className="order-value">{booking.seats}</span>
                  </div>
                  
                  <div className="order-item">
                    <span className="order-label">💰 Total Price</span>
                    <span className="order-value order-price">₹{booking.totalPrice}</span>
                  </div>
                </div>
                
                <div className="order-footer">
                  <small>{booking.bookedAt}</small>
                </div>
              </div>
            ))}
          </div>
          <hr style={{borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0'}} />
        </div>
      )}

      <h2 style={{marginBottom: 20}}>Select Your Movie</h2>
      
      {/* Search and Filter */}
      <div style={{marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center'}}>
        <input 
          className="input" 
          placeholder="Search movies..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{flex: 1, minWidth: 200}}
        />
        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.05)',
                background: selectedGenre === genre ? '#ff6b6b' : 'rgba(255,255,255,0.02)',
                color: selectedGenre === genre ? '#081025' : 'inherit',
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="movies">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <div key={movie.id} className="card" style={{flex: '1 1 280px', padding: 0, overflow: 'hidden'}}>
              {/* Movie Banner - Professional Poster */}
              <div style={{
                background: movie.bannerGradient,
                padding: '40px 16px',
                textAlign: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                position: 'relative',
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#fff',
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  textAlign: 'center',
                  lineHeight: '1.3'
                }}>
                  {movie.title}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#fff',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  fontWeight: '600'
                }}>
                  ⭐ {movie.rating}
                </div>
              </div>

              {/* Movie Info */}
              <div style={{padding: '16px'}}>
                <div className="movie-title" style={{fontSize: 16, marginBottom: 4}}>{movie.title}</div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9aa4b2', marginBottom: 4}}>
                  <span>{movie.genre}</span>
                  <span>{movie.language}</span>
                </div>

                <div style={{fontSize: 11, color: '#9aa4b2', marginBottom: 8}}>
                  {movie.duration}
                </div>

                {/* Description */}
                <div style={{fontSize: 13, color: '#ccc', marginBottom: 8, lineHeight: '1.4', minHeight: 32}}>
                  {movie.description}
                </div>

                {/* Cast */}
                <div style={{fontSize: 11, color: '#9aa4b2', marginBottom: 10}}>
                  <span style={{color: '#ff6b6b'}}>Cast:</span> {movie.cast}
                </div>

                <div style={{fontSize: 14, fontWeight: 600, color: '#ff6b6b', marginBottom: 12}}>
                  ₹{movie.price} per seat
                </div>

                <div style={{marginBottom: 12}}>
                  <label style={{display: 'block', fontSize: 12, marginBottom: 6, color: '#9aa4b2'}}>Select Showtime</label>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6}}>
                    {movie.showTimes.map((time, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectShowtime(movie, time)}
                        style={{
                          padding: '6px 10px',
                          fontSize: 11,
                          borderRadius: 6,
                          border: '1px solid rgba(255,255,255,0.05)',
                          background: 'rgba(255,255,255,0.02)',
                          color: 'inherit',
                          cursor: 'pointer'
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  className="btn primary" 
                  onClick={() => handleSelectShowtime(movie, movie.showTimes[0])}
                  style={{width: '100%'}}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{gridColumn: '1/-1', textAlign: 'center', color: '#9aa4b2', padding: 40}}>
            No movies found
          </div>
        )}
      </div>
    </div>
  );
}
