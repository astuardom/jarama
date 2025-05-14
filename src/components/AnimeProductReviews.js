import React from 'react';

const AnimeProductReviews = ({ productId }) => {
  // Datos simulados de reseñas
  const reviews = [
    { id: 1, user: 'FanDeNaruto', rating: 5, comment: '¡Excelente polera, la tela es muy cómoda y el diseño es genial!' },
    { id: 2, user: 'OtakuFeliz', rating: 4, comment: 'Muy buena calidad, llegó rápido. El diseño es un poco más oscuro de lo que esperaba.' },
  ];

  return (
    <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">Reseñas ({reviews.length})</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600">Sé el primero en dejar una reseña!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center mb-2">
                <span className="font-bold mr-2 text-gray-800">{review.user}</span>
                <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeProductReviews;