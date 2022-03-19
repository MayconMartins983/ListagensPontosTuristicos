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
            try
            {
                return await _context.PontosTuristicos.ToListAsync();
            }
            catch
            {
                throw;
            }
        }
        public async Task<PontoTuristico> GetPontoTuristico(int Id)
        {
            var pontoturistico = await _context.PontosTuristicos.FindAsync(Id);
            return pontoturistico;
        }
        public async Task<IEnumerable<PontoTuristico>> GetPontoTuristicoByName(string name)
        {
            IEnumerable<PontoTuristico> pontoturistico;
            if (!string.IsNullOrWhiteSpace(name))
            {
                pontoturistico = await _context.PontosTuristicos.Where(n => n.Name.Contains(name)).ToListAsync();                
            }
            else
            {
                pontoturistico = await GetPontoTuristico();
            }
            return pontoturistico;
        }
       

        public async Task CreatePontoTuristico(PontoTuristico pontoTuristico)
        {
            _context.PontosTuristicos.Add(pontoTuristico);
            await _context.SaveChangesAsync();
        }
        public async Task UpdatePontoTuristico(PontoTuristico pontoTuristico)
        {
            _context.Entry(pontoTuristico).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePontoTuristico(PontoTuristico pontoTuristico)
        {
            _context.PontosTuristicos.Remove(pontoTuristico);
            await _context.SaveChangesAsync(); ;
        }

        

       

       

        
    }
}
