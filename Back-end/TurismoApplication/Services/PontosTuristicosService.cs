using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TurismoApplication.Models;
using TurismoApplication.Models.Context;

namespace TurismoApplication.Services
{
    public class PontosTuristicosService : IPontosTuristicosService
    {
        private readonly AppDbContext _context;
        public PontosTuristicosService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<PontoTuristico>> GetPontoTuristico()
        {
            
                return await _context.PontosTuristicos.ToListAsync();
           
        }
        public async Task<PontoTuristico> GetPontoTuristico(int Id)
        {
            var pontoturistico = await _context.PontosTuristicos.FindAsync(Id);
            return pontoturistico;
        }
       

        public async Task CreatePontoTuristico(PontoTuristico pontoTuristico)
        {
            _context.PontosTuristicos.Add(pontoTuristico);
            await _context.SaveChangesAsync();
        }
  
    }
}
